import { defineConfig } from '@playwright/test';
import { mergePlaywrightConfig } from './utils/mergePlaywrightConfig';
import baseConfig from './playwright.config.base'
import { CONSTS } from './utils/consts';

export default mergePlaywrightConfig(
  baseConfig,
  defineConfig({
    testDir: 'tests/herokuapp/visual',
    reporter: [
      ['list'],
      ['html', { outputFolder: CONSTS.REPORTER.VISUAL.PATH, open: 'never' }],
      ['json', { outputFile: CONSTS.REPORTER.VISUAL.OUTPUT_FILE_JSON}],
      ['junit', { outputFile: CONSTS.REPORTER.VISUAL.OUTPUT_FILE_JUNIT }],
    ],
  })
);
