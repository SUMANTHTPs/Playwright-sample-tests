import { expect, Page } from "@playwright/test";
import { selectors } from "../utils/selectors";
import {
  getArtifactsDir,
  getAuthArtifactsDir,
  getConfig,
  getStorageStateDir,
} from "../utils/testUtils";

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
    expect(await this.page.title()).toContain("Amazon");
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
    expect(await this.page.title()).toContain("Amazon");

    // https://github.com/microsoft/playwright/issues/21096
    await this.page.waitForTimeout(30000);
    await this.page.context().storageState({
      path: getStorageStateDir(),
    });
  }

  public async searchForItem() {
    await this.page.waitForLoadState();
    await this.page.fill(selectors.itemSearchBox, "shoes");
    await this.page.click(selectors.searchIcon);
    await this.page.waitForLoadState();

    await this.page.waitForSelector(selectors.filtersPane);
    const results = await this.page.$$eval(
      selectors.itemCategories,
      (categories) => categories.map((category: any) => category.textContent)
    );

    expect(results.length).toBeGreaterThan(0);
    results.forEach((result: string) => {
      try {
        expect(result.toLowerCase()).toContain("shoe");
      } catch (e) {
        expect(result.toLowerCase()).toContain("sneaker");
      }
    });
  }
}
