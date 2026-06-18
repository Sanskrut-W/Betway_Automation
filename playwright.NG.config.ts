import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './src/regions/NG/tests',

  fullyParallel: true,
  timeout: 90000,

  forbidOnly: !!process.env.CI,

  // 👉 Retry ONLY failed tests once
  retries: 1,

  // Workers
  workers: process.env.CI ? 7 : 7,

  // Reports
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: path.resolve('src/regions/NG/reports', process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'test-results.json') }],
    ['allure-playwright', { resultsDir: path.resolve('src/regions/NG/reports/allure-results') }],
  ],

  use: {
    baseURL: 'https://www.betway.com.ng', // Domain root — page objects pass their own path to BasePage.goto()

    // Use real browser window size
    viewport: null,
    deviceScaleFactor: undefined,

    launchOptions: {
      args: ['--start-maximized'],
    },

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',

    actionTimeout: 60000,
    navigationTimeout: 60000,
  },

  projects: [
    {
      name: 'NG Region',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
