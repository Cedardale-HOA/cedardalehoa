import { expect, test } from "@playwright/test";

async function gotoDuesSection(page: import("@playwright/test").Page) {
  await page.goto("/");
  const duesSection = page.locator("#dues");
  await expect(duesSection).toBeVisible();
  await duesSection.scrollIntoViewIfNeeded();
}

test("renders Zeffy embed on direct homepage load", async ({ page }) => {
  await gotoDuesSection(page);

  const primaryIframe = page.locator('[data-testid="zeffy-embed-container"] iframe');
  await expect(primaryIframe.first()).toBeVisible({ timeout: 15000 });
});

test("shows fallback when Zeffy script is blocked", async ({ page }) => {
  await page.route("https://www.zeffy.com/embed/v2/zeffy-embed.js", (route) =>
    route.abort()
  );

  await gotoDuesSection(page);

  const fallback = page.locator('[data-testid="zeffy-embed-fallback"]');
  await expect(fallback).toBeVisible({ timeout: 15000 });
  await expect(fallback.locator("iframe")).toBeVisible();
});

test("re-initializes dues embed after client-side navigation back to homepage", async ({
  page,
}) => {
  await page.goto("/events");
  await expect(page).toHaveURL(/\/events$/);

  await page.locator('a[href="/#dues"]').first().click();
  await expect(page).toHaveURL(/\/#dues$/);

  const duesSection = page.locator("#dues");
  await expect(duesSection).toBeVisible();
  await duesSection.scrollIntoViewIfNeeded();

  const primaryIframe = page.locator('[data-testid="zeffy-embed-container"] iframe');
  const fallback = page.locator('[data-testid="zeffy-embed-fallback"]');

  await Promise.race([
    expect(primaryIframe.first()).toBeVisible({ timeout: 15000 }),
    expect(fallback).toBeVisible({ timeout: 15000 }),
  ]);
});
