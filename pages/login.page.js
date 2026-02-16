// pages/login.page.js
const BasePage = require('./base.page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    
    // Define locators using Playwright's recommended selectors
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Page actions
  async navigateToLogin() {
    await this.navigate('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorDisplayed() {
    return await this.errorMessage.isVisible();
  }
}

module.exports = LoginPage;