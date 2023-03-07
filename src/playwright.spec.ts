import {chromium, expect, Browser} from "@playwright/test";
import { PlaywrightVisualRegressionTracker} from "@visual-regression-tracker/agent-playwright";
import { test as base } from "@playwright/test";

type TestFixtures = {
  vrt: PlaywrightVisualRegressionTracker;
};

const test = base.extend<{}, TestFixtures>({
  vrt: [
    async ({ browserName }, use) => {
      await use(new PlaywrightVisualRegressionTracker(browserName));
    },
    { scope: "worker" },
  ],
});


test.beforeAll(async ({ vrt }) => {
  await vrt.start();
});

test.afterAll(async ({ vrt }) => {
  await vrt.stop();
});

test("Google page", async ({ page, vrt }) => {
  await page.goto("https://google.com/");
  await vrt.trackPage(page, "Google page");
});

// test("Visual comparisons", async ({ page }) => {
//   await page.goto("https://amazon.com/");
//   await expect(await page.screenshot( {fullPage: true})).toMatchSnapshot("amazon.com.png");
// });
