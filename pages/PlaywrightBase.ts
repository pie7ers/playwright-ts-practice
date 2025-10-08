import { Locator, Page, expect } from "@playwright/test";

export interface IResize {
  element: Locator;
  resizeX?: number;
  resizeY?: number;
}

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

  async resizeElement(options: IResize) {
    const box = await options.element.boundingBox()
    if (!box) throw new Error(`element ${options.element} not found`)

    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    await this.page.mouse.move(startX, startY)
    await this.page.mouse.down()

    await this.page.mouse.move(
      startX + (options.resizeX || 0),
      startY + (options.resizeY || 0),
      { steps: 20 }//simulate a slow drag
    );

    await this.page.mouse.up();
  }

} 