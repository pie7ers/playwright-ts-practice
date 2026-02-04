import { Page, Locator, TestInfo } from '@playwright/test';
import HerokuappBase from './HerokuappBase';

export default class HomePage extends HerokuappBase {
  readonly headTitle: Locator;

  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
    this.headTitle = page.locator('h1.heading');
  }
}

