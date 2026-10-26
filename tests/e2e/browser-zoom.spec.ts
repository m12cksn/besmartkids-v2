import { chromium, expect, test } from "@playwright/test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

test("public pages reflow at actual 200 percent browser zoom", async ({}, testInfo) => {
  const profile = await mkdtemp(path.join(tmpdir(), "bsk-zoom-"));
  const extension = path.resolve("tests/fixtures/browser-zoom");
  const context = await chromium.launchPersistentContext(profile, {
    channel: "chromium",
    headless: true,
    viewport: { width: 1280, height: 900 },
    args: [
      `--disable-extensions-except=${extension}`,
      `--load-extension=${extension}`,
    ],
  });
  try {
    const worker = context.serviceWorkers()[0] ?? await context.waitForEvent("serviceworker");
    const page = await context.newPage();
    const evidence = [];
    for (const route of ["/", "/grades", "/grades/5/topics"]) {
      const url = `http://127.0.0.1:3107${route}`;
      await page.goto(url);
      // Browser-level tab zoom, not CSS zoom, deviceScaleFactor or pinch scaling.
      const factor = await worker.evaluate(async (targetUrl) => {
        type Tabs = {
          query(query: { url: string }): Promise<{ id?: number }[]>;
          setZoomSettings(id: number, settings: { mode: string; scope: string }): Promise<void>;
          setZoom(id: number, factor: number): Promise<void>;
          getZoom(id: number): Promise<number>;
        };
        const api = (globalThis as unknown as { chrome: { tabs: Tabs } }).chrome;
        const tab = (await api.tabs.query({ url: targetUrl }))[0];
        if (tab?.id === undefined) throw new Error("Test tab not found");
        await api.tabs.setZoomSettings(tab.id, { mode: "automatic", scope: "per-tab" });
        await api.tabs.setZoom(tab.id, 2);
        return api.tabs.getZoom(tab.id);
      }, url);
      expect(factor).toBe(2);
      await expect.poll(() => page.evaluate(() => window.innerWidth)).toBe(640);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const link of await page.getByRole("link").all()) {
        const box = await link.boundingBox();
        if (!box || box.y < 0) continue;
        expect(await link.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
      }
      evidence.push({ route, zoom: factor, cssViewport: await page.evaluate(() => innerWidth), physicalViewport: page.viewportSize(), devicePixelRatio: await page.evaluate(() => devicePixelRatio) });
      await page.screenshot({ path: testInfo.outputPath(`zoom-200-${route === "/" ? "landing" : route.replaceAll("/", "-")}.png`), fullPage: false, animations: "disabled" });
    }
    await page.getByRole("link", { name: "Kembali ke pilihan kelas", exact: true }).click();
    await expect(page).toHaveURL(/\/grades$/);
    await writeFile(testInfo.outputPath("zoom-evidence.json"), JSON.stringify(evidence, null, 2));
  } finally {
    await context.close();
    await rm(profile, { recursive: true, force: true });
  }
});
