// tests/login.spec.js
const { test, expect } = require('../fixtures/auth.fixture');
const testData = require('../utils/testdata');

test.describe('Login Functionality', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });

  test('successful login with valid credentials', async ({ loginPage, page }) => {
    // Perform login
    await loginPage.login(
      testData.validUsers.standard.username,
      testData.validUsers.standard.password
    );

    // Verify redirect to inventory page
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Verify inventory container is visible
    const inventoryPage = require('../pages/inventory.page');
    const inventory = new inventoryPage(page);
    await expect(inventory.inventoryContainer).toBeVisible();
  });

  test('login fails with locked user', async ({ loginPage }) => {
    // Attempt login with locked user
    await loginPage.login(
      testData.invalidUsers.locked.username,
      testData.invalidUsers.locked.password
    );

    // Verify error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('login fails with invalid credentials', async ({ loginPage }) => {
    // Attempt login with wrong password
    await loginPage.login(
      testData.invalidUsers.wrongPassword.username,
      testData.invalidUsers.wrongPassword.password
    );

    // Verify error message appears
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('login requires username and password', async ({ loginPage }) => {
    // Click login without credentials
    await loginPage.loginButton.click();

    // Verify error message
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });
});
