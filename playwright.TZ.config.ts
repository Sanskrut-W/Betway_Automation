// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//   testDir: './src/regions/TZ/tests',
//   fullyParallel: true,
//   timeout: 200000,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 3 : 3,
//   reporter: [
//     ['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']
//     // ['allure-playwright', { outputFolder: 'src/regions/ZA/reports/allure-results' }]
//   ],
//   use: {
//     baseURL: 'https://en.betway.co.tz/sport/soccer',
//     viewport: null,                        // <- This disables the fixed viewport size, so browser window controls actual size
//     launchOptions: {
//       args: ['--start-maximized'],
//     },
//     trace: 'on-first-retry',
//     screenshot: 'only-on-failure',
//   },

//   projects: [
//     {
//       name: 'TZ Region',
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
  testDir: './src/regions/TZ/tests',

  fullyParallel: true,
  timeout: 90000,

  forbidOnly: !!process.env.CI,

  // 👉 Retry ONLY failed tests once
  retries: 1,

  // Workers
  workers: process.env.CI ? 7 : 7,

  // Reports (same as ZA / GH / MZ)
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    [
      'json',
      {
        outputFile: path.resolve(
          __dirname,
          'src/regions/TZ/reports',
          process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'test-results.json'
        ),
      },
    ],
    [
      'allure-playwright',
      {
        resultsDir: path.resolve(
          __dirname,
          'src/regions/TZ/reports/allure-results'
        ),
      },
    ],
  ],

  use: {
    // Domain root — page objects pass their own path to BasePage.goto()
    baseURL: 'https://en.betway.co.tz',

    // Real browser window size
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
      name: 'TZ Region',
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
