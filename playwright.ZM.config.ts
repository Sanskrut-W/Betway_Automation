// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//     testDir: './src/regions/ZM/tests',
//     fullyParallel: true,
//     timeout: 200000,
//     forbidOnly: !!process.env.CI,
//     retries: process.env.CI ? 2 : 0,
//     workers: process.env.CI ? 3 : 3,
//     reporter: [
//         ['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']
//         // ['allure-playwright', { outputFolder: 'src/regions/ZM/reports/allure-results' }]
//     ],
//     use: {
//         baseURL: 'https://en.betway.co.zm/sport/soccer',
//         viewport: null,                        // <- This disables the fixed viewport size, so browser window controls actual size
//         launchOptions: {
//             args: ['--start-maximized'],
//         },
//         trace: 'on-first-retry',
//     },

//     projects: [
//         {
//             name: 'chromium',
//             use: { ...devices['Desktop Chrome'] },
//         },
//     ],
// });


import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './src/regions/ZM/tests',

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
    ['json', { outputFile: path.resolve(__dirname, 'src/regions/ZM/reports', process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'test-results.json') }],
    ['allure-playwright', { resultsDir: path.resolve(__dirname, 'src/regions/ZM/reports/allure-results') }],
  ],

  // ['json', { outputFile: 'test-results.json' }],
  // ['allure-playwright', { resultsDir: path.resolve(__dirname, 'src/regions/ZM/reports/allure-results') }],
  use: {
    baseURL: 'https://www.betway.co.zm/',

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
      name: 'ZM Region',
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
