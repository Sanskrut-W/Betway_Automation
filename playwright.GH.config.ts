// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//   testDir: './src/regions/GH/tests',
//   fullyParallel: true,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 3 : 3,
//   timeout: 200000,
//   reporter: [
//     ['html', { outputFolder: 'src/regions/GH/reports/html-report' }],
//     ['allure-playwright', { outputFolder: 'src/regions/GH/reports/allure-results' }]
//   ],
//   use: {
//     baseURL: 'https://www.betway.com.gh/',
//     trace: 'on-first-retry',
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//   },
//   projects: [
//     {
//       name: 'GH Region',
//       use: {
//         ...devices['Desktop Chrome'],
//         viewport: null,
//         deviceScaleFactor: undefined,
//         launchOptions: {
//           args: ['--start-maximized'],
//         },
//       }
//     },
//   ],
// });

import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './src/regions/GH/tests',

  fullyParallel: true,
  timeout: 90000,

  forbidOnly: !!process.env.CI,

  // 👉 Retry ONLY failed tests once
  retries: 1,

  // Workers
  workers: process.env.CI ? 7 : 7,

  // Reports (same structure as ZA)
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    [
      'json',
      {
        outputFile: path.resolve(
          __dirname,
          'src/regions/GH/reports',
          process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'test-results.json'
        ),
      },
    ],
    [
      'allure-playwright',
      {
        resultsDir: path.resolve(
          __dirname,
          'src/regions/GH/reports/allure-results'
        ),
      },
    ],
  ],

  use: {
    baseURL: 'https://www.betway.com.gh/',

    // Real browser window
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
      name: 'GH Region',
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

