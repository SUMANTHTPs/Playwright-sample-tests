/**
 * Relative selectors might change. 
 * Add custom test attributes to applications like test-id or automation-id
 */
export const selectors = {
  email: 'input[name="email"]',
  password: "input#ap_password",
  continue: "#continue",
  signInSubmitButton: "#signInSubmit",
  itemSearchBox: "#twotabsearchtextbox",
  searchIcon: '[id="nav-search-submit-button"]',
  itemCategories: "#departments a span",
  filtersPane: '[id="s-refinements"]',
  adidasCheckbox: '[aria-label="adidas"] input',
  searchedProductsTitle: '[data-cy="title-recipe"]',
  adidasFilterInNav: 'li[aria-label="adidas"] a',
  expandFilters: "span.a-expander-prompt",
  offerOrDiscount: '[data-cy="price-recipe"] a+span+span',
  productTitle: "#productTitle",
  addToCart: "#add-to-cart-button",
  cartCountInNav: "#nav-cart-count",
};
