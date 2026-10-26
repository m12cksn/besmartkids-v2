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
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/grades", "/grades/5/topics"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  });
}
