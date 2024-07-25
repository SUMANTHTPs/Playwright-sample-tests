import test from "@playwright/test";
import { LandingPage } from "../pages/landingPage.page";
import {
  checkLoginWithStateFile,
  getStorageStateDir,
} from "../utils/testUtils";

test.describe("Scenario based tests", () => {
  let landingPage: LandingPage;

  test.beforeAll(async () => {
    const loginStateExists = checkLoginWithStateFile();
    if (!loginStateExists) {
      console.log("Skipping tests because login state is not available");
      test.skip();
    }
  });

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
