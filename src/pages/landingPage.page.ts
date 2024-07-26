import { expect, Page } from "@playwright/test";
import { Constants } from "../utils/constants";
import { getConfig, getStorageStateDir } from "../utils/testUtils";
import { selectors } from "../utils/selectors";

export class LandingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to amazon landing page
   */
  public async navigateToApp() {
    await this.page.goto("/");
    await this.page.waitForLoadState();
    expect(await this.page.title()).toContain(Constants.AMAZON);
    return true;
  }

  /**
   * Sign in to the app
   */
  public async signIn() {
    await this.page.getByText("Sign in").last().click();
    await this.page.waitForLoadState();
    await this.page.locator(selectors.email).fill(getConfig().email);
    await this.page.locator(selectors.continue).last().click();
    await this.page.locator(selectors.password).fill(getConfig().password);
    await this.page.locator(selectors.signInSubmitButton).last().click();
    await this.page.waitForLoadState();
    expect(await this.page.title()).toContain(Constants.AMAZON);

    // https://github.com/microsoft/playwright/issues/21096
    await this.page.waitForTimeout(10000);
    await this.page.context().storageState({
      path: getStorageStateDir(),
    });
  }

  /**
   * Search for item
   */
  public async searchForItem(item: string = Constants.SHOE) {
    await this.page.waitForLoadState();
    await this.page.fill(selectors.itemSearchBox, item);
    await this.page.click(selectors.searchIcon);
    await this.page.waitForLoadState();
    await this.page.waitForSelector(selectors.filtersPane);
    const results = await this.page.$$eval(
      selectors.itemCategories,
      (categories) => categories.map((category: any) => category.textContent)
    );
    const itemsOnScreen = await this.page.getByText(item).count();
    expect(results.length).toBeGreaterThan(0);
    expect(itemsOnScreen).toBeGreaterThan(10);
    results.forEach((result: string) => {
      try {
        expect(result.toLowerCase()).toContain(item);
      } catch (e) {
        expect(result.toLowerCase()).toContain(Constants.SNEAKER);
      }
    });
  }
}
