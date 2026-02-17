// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: true,        // Run tests in parallel
  forbidOnly: !!process.env.CI,  // Fail on .only in CI
  retries: process.env.CI ? 2 : 0,  // Retry on CI
  workers: process.env.CI ? 1 : undefined,  // Parallel workers

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results.json' }],
    ['list'],  // Console output
    ['allure-playwright',
      {
        resultsDir: 'allure-results',

        environmentInfo: {
          // Load from .env file
          'Environment': process.env.TEST_ENV,
          'Base URL': process.env.BASE_URL,
          'Tester Name': process.env.TESTER_NAME,
          'Build Number': process.env.BUILD_NUMBER,
          'Branch': process.env.BRANCH_NAME,
          'API Version': process.env.API_VERSION,
          'Database': process.env.DATABASE_VERSION,

          // Static values
          'Node Version': process.version,
          'Execution Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }
      }
    ]

  ],

  // Shared settings for all projects
  use: {
    baseURL: process.env.BASE_URL,

    // Browser context options
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',

    // Viewport and browser settings
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Action timeout
    actionTimeout: 10 * 1000,
  },

  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // // Mobile viewports
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],

  // Web server configuration (if needed)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});