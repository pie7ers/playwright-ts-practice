import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config.base';
import { mergePlaywrightConfig } from './utils/mergePlaywrightConfig';


export default mergePlaywrightConfig(
  baseConfig,
  defineConfig({})
);
