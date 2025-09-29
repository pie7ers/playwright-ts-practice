import { Locator, Page, expect } from "@playwright/test";

export default class PlaywrightBase {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(urlPage: string = '') {
    await this.page.goto(urlPage);
  }

  async clickWithRedirectionToURL(locator: Locator, urlExpected: string) {
    await locator.click()
    await this.page.waitForURL(urlExpected, { timeout: 5000 })
    expect(this.page.url()).toBe(urlExpected)
  }

  async fullScreenShot(path: string = 'screenshot-test.png') {
    await this.page.screenshot({ path: `evidences/${path}.png`, fullPage: true })
  }

  async getHeadingText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  async getExampleLinks(locator: Locator): Promise<string[]> {
    return locator.evaluateAll(links =>
      links.map(link => (link as HTMLAnchorElement).textContent?.trim() || '')
    );
  }
} 