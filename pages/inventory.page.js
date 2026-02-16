// pages/inventory.page.js
const BasePage = require('./base.page');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // Locators
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  // Dynamic locators for specific items
  getAddToCartButton(productName) {
    return this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
  }

  getRemoveButton(productName) {
    return this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
  }

  // Actions
  async addItemToCart(productName) {
    const addButton = this.getAddToCartButton(productName);
    await addButton.click();
  }

  async getCartItemCount() {
    return await this.shoppingCartBadge.textContent();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async isInventoryDisplayed() {
    return await this.inventoryContainer.isVisible();
  }

  async getInventoryItemsCount() {
    return await this.inventoryItems.count();
  }
}

module.exports = InventoryPage;