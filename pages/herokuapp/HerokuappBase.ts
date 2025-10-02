import { Page, Locator, expect } from "@playwright/test";
import PlaywrightBase from "../PlaywrightBase";

export default class HerokuappBase extends PlaywrightBase {

  readonly exampleLinks: Locator;
  readonly footherPoweredBy: Locator;
  readonly mainPath = 'herokuapp';

  constructor(page: Page) {
    super(page);
    this.exampleLinks = page.locator('ul li a');
    this.footherPoweredBy = page.getByRole('link', { name: 'Elemental Selenium' })
  }

  async clickExampleLink(linkText: string) {
    await this.page.click(`ul li a:has-text("${linkText}")`);
  }

  async expectElementalSeleniumURL() {
    await expect.soft(this.footherPoweredBy).toHaveAttribute('href', 'http://elementalselenium.com/')
  }

}