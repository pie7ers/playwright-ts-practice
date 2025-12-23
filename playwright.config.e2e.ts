import { defineConfig } from '@playwright/test';
import { mergePlaywrightConfig } from './utils/mergePlaywrightConfig';
import baseConfig from './playwright.config.base'
import { toArray } from './utils/arrays';
import { CONSTS } from './utils/consts';

export default mergePlaywrightConfig(
  baseConfig,
  defineConfig({
    testIgnore: [
      ...toArray(baseConfig.testIgnore),
      'herokuapp/visual/**',
    ],
    reporter: [
      ['dot'],
      ['html', { outputFolder: CONSTS.REPORTER.E2E.PATH, open: 'never' }],
      ['json', { outputFile: CONSTS.REPORTER.E2E.OUTPUT_FILE_JSON}],
      ['junit', { outputFile: CONSTS.REPORTER.E2E.OUTPUT_FILE_JUNIT }],
    ],
  })
);
