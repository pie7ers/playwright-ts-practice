import { defineConfig, devices } from '@playwright/test';
import { CONSTS } from './utils/consts';

export default defineConfig({
  testDir: './tests',
  testIgnore: [
    'herokuapp/basicAuthOtherPractices/**',
    'herokuapp/digestAsBasic/**'
  ],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],           // prints results in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // generates HTML report but doesn’t auto-open
  ],
  timeout: 60000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //here httpCredentials is global then all the browsers will inherit the credentials
    httpCredentials: {
      username: CONSTS.HEROKU_BASIC_AUTH_USER_GLOBAL,
      password: CONSTS.HEROKU_BASIC_AUTH_PASS_GLOBAL,
    }
  },
  //snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  snapshotPathTemplate: '{snapshotDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}',
  expect: {
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.02,
    },
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05
    }
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      //all the options declared at the project level override the global options
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080, },
        //viewport: { width: 3456, height: 2234 },
        //here httpCredentials is local then chromium will inherit the credentials
        httpCredentials: {
          username: CONSTS.HEROKU_BASIC_AUTH_USER_CHROMIUM,
          password: CONSTS.HEROKU_BASIC_AUTH_PASS_CHROMIUM,
        }
      },
      //dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080, },
      },
    },

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
