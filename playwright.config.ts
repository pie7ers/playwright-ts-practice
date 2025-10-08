import { defineConfig, devices } from '@playwright/test';
import { CONSTS } from './utils/consts';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  testIgnore: ['herokuapp/basicAuthOtherPractices/**', 'herokuapp/digestAsBasic/**'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],           // prints results in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // generates HTML report but doesn’t auto-open
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //here httpCredentials is global then all the browsers will inherit the credentials
    httpCredentials: {
      username: CONSTS.BASIC_AUTH_USER_GLOBAL,
      password: CONSTS.BASIC_AUTH_PASS_GLOBAL,
    }
  },
  timeout: 60000,
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      //all the options declared at the project level override the global options
      use: {
        ...devices['Desktop Chrome'],
        //here httpCredentials is local then chromium will inherit the credentials
        httpCredentials: {
          username: CONSTS.BASIC_AUTH_USER_CHROMIUM,
          password: CONSTS.BASIC_AUTH_PASS_CHROMIUM,
        }
      },
      //dependencies: ['setup'],
    },

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }, */

    /*{
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
