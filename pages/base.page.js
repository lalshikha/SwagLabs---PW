class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Navigation methods
  async navigate(url) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  // Element interaction methods with auto-waiting
  async click(locator) {
    await locator.click();
  }

  async fill(locator, text) {
    await locator.fill(text);
  }

  async getText(locator) {
    return await locator.textContent();
  }

  // Wait methods
  async waitForElement(locator, state = 'visible') {
    await locator.waitFor({ state });
  }

  // Assertion helpers
  async expectVisible(locator) {
    await expect(locator).toBeVisible();
  }

  async expectText(locator, expectedText) {
    await expect(locator).toHaveText(expectedText);
  }

  // Screenshot method
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
}

module.exports = BasePage;