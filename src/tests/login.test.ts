import { test } from "@playwright/test";
import * as fs from "fs";
import { getStorageStateDir } from "../utils/testUtils";
import { LandingPage } from "../pages/landingPage.page";

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
