import test from "@playwright/test";
import { LandingPage } from "../pages/landingPage.page";
import { testDescribe } from "../utils/testUtils";
import { ProductsPage } from "../pages/productsPage.page";

testDescribe("Apply filters", () => {
  let landingPage: LandingPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    productsPage = new ProductsPage(page);
  });

  test("Apply filters", async ({ page }) => {
    await test.step("Go to amazon", async () => {
      await landingPage.navigateToApp();
    });

    await test.step("Search for item", async () => {
      await landingPage.searchForItem();
    });

    await test.step("Apply filters", async () => {
      await productsPage.applyFilters();
    });
  });
});
