import { expect, test } from "@playwright/test";

test("foundation page is usable on desktop and mobile", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Matematika terasa lebih dekat");
  await expect(page.getByRole("navigation", { name: "Navigasi utama" })).toBeVisible();
  await page.getByRole("link", { name: "Status Sprint 1" }).click();
  await expect(page.getByRole("heading", { name: "Siap untuk Sprint 2" })).toBeInViewport();
});
