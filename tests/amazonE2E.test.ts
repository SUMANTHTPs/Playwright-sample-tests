import { test } from "@playwright/test";
import { LandingPage } from "../pages/landingPage.page";
import * as fs from "fs";
import { getStorageStateDir } from "../utils/testUtils";

test.describe("Amazon login suite", () => {
  let landingPage: LandingPage;
  const storageStateExists = fs.existsSync(getStorageStateDir());

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
  });

  test("Login to amazon", async ({ page }) => {
    if (!storageStateExists) {
      await test.step("Go to amazon", async () => {
        await landingPage.navigateToApp();
      });

      await test.step("Login to the app", async () => {
        await landingPage.signIn();
      });
    } else {
      console.log("Storage state file exists, Already logged in!!!");
    }
  });
});

test.describe.parallel("Scenario based tests", () => {
  let landingPage: LandingPage;
  const storageStateExists = fs.existsSync(getStorageStateDir());

  test.use({ storageState: getStorageStateDir()});

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
