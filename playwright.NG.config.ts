import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './src/regions/NG/tests',
  fullyParallel: true,
  timeout: 90000,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : 3,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: path.resolve(__dirname, 'src/regions/NG/reports', process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'test-results.json') }],
    ['allure-playwright', { resultsDir: path.resolve(__dirname, 'src/regions/NG/reports/allure-results') }],
  ],

  // ['json', { outputFile: 'test-results.json' }],
  // ['allure-playwright', { resultsDir: path.resolve(__dirname, 'src/regions/ZA/reports/allure-results') }],
  use: {
    baseURL: 'https://www.betway.com.ng/sport/soccer',
    viewport: null,                        // <- This disables the fixed viewport size, so browser window controls actual size
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
