import test from "@playwright/test";
import { LandingPage } from "../pages/landingPage.page";
import { testDescribe } from "../utils/testUtils";

testDescribe("Scenario based tests", () => {
  let landingPage: LandingPage;

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
