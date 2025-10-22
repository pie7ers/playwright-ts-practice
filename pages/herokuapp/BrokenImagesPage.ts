import { Page, Locator } from '@playwright/test';
import HerokuappBase from './HerokuappBase';

export default class BrokenImagesPage  extends HerokuappBase {
  
  readonly headTitle: Locator;
  readonly headTitleText: string;
  readonly images: Locator;
  readonly firstImage: Locator;
  readonly lastImage: Locator;

  constructor(page: Page) {
    super(page);
    this.headTitle = page.locator('h3');
    this.headTitleText = 'Broken Images'
    this.images = page.locator('div[class="example"] > img');
    this.firstImage = this.images.first()
    this.lastImage = this.images.nth(2)
  }
}