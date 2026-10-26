import { expect, test } from "@playwright/test";

test("student can browse the truthful public preview", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Sekarang, paham.",
  );
  await page
    .getByRole("main")
    .getByRole("link", { name: "Pilih kelas", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(6);
  await page.getByRole("link", { name: /Lihat pratinjau kelas 5/ }).click();
  await expect(
    page.getByText("Pratinjau—belum bisa dipelajari.", { exact: true }),
  ).toBeVisible();
  for (const topic of ["Pecahan", "Desimal", "Persentase"]) {
    await expect(
      page.getByRole("heading", { name: topic, exact: true }),
    ).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("upcoming and invalid grades have useful states", async ({ page }) => {
  await page.goto("/grades/1/topics");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "sedang disiapkan",
  );
  const response = await page.goto("/grades/7/topics");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Halaman ini belum ada.",
  );
});

test("keyboard skip link and catalog navigation work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Langsung ke isi" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("main")
      .getByRole("link", { name: "Pilih kelas", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/grades$/);
});

for (const width of [360, 768, 1280]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/grades", "/grades/5/topics"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: testInfo.outputPath(`${path === "/" ? "landing" : path.replaceAll("/", "-")}-${width}.png`),
        fullPage: true,
        animations: "disabled",
      });
    }
  });
}

// This checks rendered motion across frames, rather than only setting the preference.
test("reduced motion keeps the hero stationary during hydration", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    type Probe = { done: boolean; samples: { opacity: string; transform: string }[] };
    const targetWindow = window as Window & { motionProbe?: Probe };
    const probe: Probe = { done: false, samples: [] };
    targetWindow.motionProbe = probe;
    document.addEventListener("DOMContentLoaded", () => {
      const start = performance.now();
      function sample() {
        document.querySelectorAll("[data-motion-reveal]").forEach(element => {
          const style = getComputedStyle(element);
          probe.samples.push({ opacity: style.opacity, transform: style.transform });
        });
        if (performance.now() - start < 600) requestAnimationFrame(sample);
        else probe.done = true;
      }
      requestAnimationFrame(sample);
    }, { once: true });
  });
  await page.goto("/");
  await expect.poll(() => page.evaluate(() =>
    (window as Window & { motionProbe?: { done: boolean } }).motionProbe?.done
  )).toBe(true);
  const samples = await page.evaluate(() =>
    (window as Window & { motionProbe?: { samples: { opacity: string; transform: string }[] } }).motionProbe?.samples ?? []
  );
  expect(samples.length).toBeGreaterThan(0);
  expect(samples.every(sample => sample.opacity === "1" && sample.transform === "none")).toBe(true);
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});

// Text enlargement is automatable here; actual browser toolbar zoom remains a manual gate.
test("public pages remain navigable with 200 percent text size", async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 900 });
  for (const path of ["/", "/grades", "/grades/5/topics"]) {
    await page.goto(path);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    // Every visible link must retain its complete label and a usable click target.
    for (const link of await page.getByRole("link").all()) {
      if (!(await link.isVisible())) continue;
      const box = await link.boundingBox();
      if (!box || box.y < 0) continue; // skip-link stays offscreen until focused
      expect(await link.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    }
  }
  await page.getByRole("link", { name: "Kembali ke pilihan kelas", exact: true }).click();
  await expect(page).toHaveURL(/\/grades$/);
});
