import { Page, Locator } from '@playwright/test';
import HerokuappBase from './HerokuappBase';

export default class BasicAuthPage  extends HerokuappBase {
  readonly headTitle: Locator
  readonly congratulationsText: Locator
  readonly textTitle: string

  constructor(page: Page) {
    super(page);
    this.headTitle = page.locator('h3');
    this.congratulationsText = page.getByText('Congratulations! You must have the proper credentials.')
    this.textTitle = 'Basic Auth'
  }
}