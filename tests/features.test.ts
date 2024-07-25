import test from "@playwright/test";
import { LandingPage } from "../pages/landingPage.page";
import { getStorageStateDir } from "../utils/testUtils";
import * as fs from "fs";

test.describe.parallel("Scenario based tests", () => {
  let landingPage: LandingPage;
  const storageStateExists = fs.existsSync(getStorageStateDir());

  test.use({ storageState: getStorageStateDir() });

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
  });

  test("Search for shoes", async ({ page }) => {
    await test.step("Go to amazon", async () => {
      await landingPage.navigateToApp();
    });

    await test.step("Search for item", async () => {
      await landingPage.searchForItem();
    });
  });
});
