import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

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
    // ['allure-playwright', { resultsDir: path.resolve(__dirname, 'src/regions/ZA/reports/allure-results') }],
    use: {
        baseURL: process.env.BASE_URL_ZM,

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
