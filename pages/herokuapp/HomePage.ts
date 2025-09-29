import { Page, Locator } from '@playwright/test';
import HerokuappBase from './HerokuappBase';

export default class HomePage extends HerokuappBase {
  readonly headTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.headTitle = page.locator('h1.heading');
  }
}

