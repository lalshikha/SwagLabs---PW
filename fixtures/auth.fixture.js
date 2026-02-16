// fixtures/auth.fixture.js
const { test: base } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const testData = require('../utils/testdata');

// Extend base test with custom fixtures
exports.test = base.extend({
  // Auto-login fixture
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(
      testData.validUsers.standard.username,
      testData.validUsers.standard.password
    );
    
    // Make authenticated page available to tests
    await use(page);
  },

  // Page object fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  }
});

exports.expect = base.expect;
