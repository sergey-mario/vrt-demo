import {chromium, expect, test} from "@playwright/test";
import {Config, PlaywrightVisualRegressionTracker} from "@visual-regression-tracker/agent-playwright";

const config: Config = {
  // URL where backend is running
  // Required
  apiUrl: "http://localhost:4200",

  // Project name or ID
  // Required
  project: "RnD Demo",

  // User apiKey
  // Required
  apiKey: "Y38C5XGA4E42WGQ3FYC3HG61DFD9",

  // Current git branch
  // Required
  branchName: "main",

  // Log errors instead of throwing exceptions
  // Optional - default false
  enableSoftAssert: true,
};

const browserName = chromium.name()
const vrt = new PlaywrightVisualRegressionTracker(browserName, config)

test.beforeAll(async () => {
  await vrt.start();
});

test.afterAll(async () => {
  const stop = await vrt.stop();
  console.log('stop', stop)
});

test("Google page", async ({ page }) => {
  await page.goto("https://google.com/");
  await vrt.trackPage(page, "Google page");
});

// test("Visual comparisons", async ({ page }) => {
//   await page.goto("https://amazon.com/");
//   await expect(await page.screenshot( {fullPage: true})).toMatchSnapshot("amazon.com.png");
// });
