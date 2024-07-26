import { defineConfig } from "@playwright/test";
import { getArtifactsDir, getConfig } from "./src/utils/testUtils";

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ["list"],
    ["json", { outputFile: getArtifactsDir() + "/reports/test-results.json" }],
  ],
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: getConfig().url,
    // storageState: getStorageStateDir(),
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
  reportSlowTests: null,
  timeout: 60000,
  outputDir: getArtifactsDir(),
  projects: [
    {
      name: "Login",
      testMatch: /.*login\.test\.ts$/,
    },
    {
      name: "All features",
      testIgnore: /.*login\.test\.ts$/,
      testMatch: /.*\.test\.ts$/,
      fullyParallel: true,
    },
  ],
});
