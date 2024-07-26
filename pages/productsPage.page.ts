import { expect, Page } from "@playwright/test";
import { selectors } from "../utils/selectors";
import {
  convertStringToNumber,
  getConfig,
  getStorageStateDir,
} from "../utils/testUtils";

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Verify apply filters 
   */
  public async applyFilters() {
    // Filter 1: Check adidas
    await this.page.waitForLoadState();
    await this.page.click(selectors.adidasFilterInNav);
    await this.page.waitForSelector(selectors.filtersPane);
    await this.page.waitForLoadState();

    const filtersApplied = await this.page.$$eval(
      selectors.searchedProductsTitle,
      (titles) => titles.map((title) => title.textContent)
    );
    expect(filtersApplied.length).toBeGreaterThan(0);
    filtersApplied.forEach((result) => {
      expect(result!.toLowerCase()).toContain("adidas");
    });

    // Filter 2: Apply discount filter
    await this.page.locator(selectors.expandFilters).first().click();
    await this.page.getByText("10% Off or more").last().click();
    await this.page.waitForSelector(selectors.filtersPane);

    const offerApplied = await this.page.$$eval(
      selectors.offerOrDiscount,
      (discounts) => discounts.map((discount) => discount.textContent!)
    );
    expect(offerApplied.length).toBeGreaterThan(0);
    offerApplied.forEach((result) => {
      expect(convertStringToNumber(result)).toBeGreaterThanOrEqual(10);
    });
  }

  /**
   * Verify add to cart feature
   */
  public async addItemToCart() {
    const firstProduct = this.page
      .locator(selectors.searchedProductsTitle)
      .first();
      
      const [productPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        firstProduct.click(),
    ])

    await productPage.waitForSelector(selectors.productTitle);
    const productTitle = await productPage
      .locator(selectors.productTitle)
      .textContent();
    expect(productTitle).toBeTruthy();

    await productPage.click(selectors.addToCart);
    await expect(productPage.locator(selectors.cartCountInNav)).toBeVisible();

    const cartCount = await productPage.locator(selectors.cartCountInNav).textContent();
    expect(Number(cartCount)).toBeGreaterThan(0);
  }
}
