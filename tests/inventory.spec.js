// tests/inventory.spec.js
const { test, expect } = require('../fixtures/auth.fixture');
const testData = require('../utils/testdata');

test.describe('Inventory Page Tests', () => {
  
  // Use authenticated fixture to skip login
  test('add single item to cart', async ({ authenticatedPage, page }) => {
    const InventoryPage = require('../pages/inventory.page');
    const inventoryPage = new InventoryPage(page);

    // Add item to cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');

    // Verify cart badge shows 1
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  });

  test('add multiple items to cart', async ({ authenticatedPage, page }) => {
    const InventoryPage = require('../pages/inventory.page');
    const inventoryPage = new InventoryPage(page);

    // Add multiple items
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bike-light');
    await inventoryPage.addItemToCart('sauce-labs-bolt-t-shirt');

    // Verify cart badge shows correct count
    await expect(inventoryPage.shoppingCartBadge).toHaveText('3');
  });

  test('verify inventory items are displayed', async ({ authenticatedPage, page }) => {
    const InventoryPage = require('../pages/inventory.page');
    const inventoryPage = new InventoryPage(page);

    // Verify inventory loads
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Verify multiple items exist
    const itemCount = await inventoryPage.getInventoryItemsCount();
    expect(itemCount).toBeGreaterThan(0);
  });
});
