import test from "@playwright/test";
import { LandingPage } from "../pages/landingPage.page";
import { testDescribe } from "../utils/testUtils";
import { ProductsPage } from "../pages/productsPage.page";

testDescribe("Add to cart", () => {
  let landingPage: LandingPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    productsPage = new ProductsPage(page);
  });

  test("Add items to cart", async ({ page }) => {
    await test.step("Go to amazon", async () => {
      await landingPage.navigateToApp();
    });

    await test.step("Search for item", async () => {
      await landingPage.searchForItem();
    });

    await test.step("Add an item to cart", async () => {
      await productsPage.addItemToCart();
    });
  });
});
