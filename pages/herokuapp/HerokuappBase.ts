import { Page, Locator } from "@playwright/test";
import PlaywrightBase from "../PlaywrightBase";

export default class HerokuappBase extends PlaywrightBase {

  readonly exampleLinks: Locator;
  readonly mainPath = 'herokuapp';

  constructor(page: Page) {
    super(page);
    this.exampleLinks = page.locator('ul li a');
  }

  async clickExampleLink(linkText: string) {
    await this.page.click(`ul li a:has-text("${linkText}")`);
  }

}