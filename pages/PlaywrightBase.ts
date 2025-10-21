import { Locator, Page, expect } from "@playwright/test";

export type dialogType = 'alert' | 'confirm' | 'prompt'
export type confirmType = 'accept' | 'dismiss'
export interface IResize {
  element: Locator;
  resizeX?: number;
  resizeY?: number;
}

interface IDialogReturn {
  type: string,
  message: string,
  defaultValue: string,
  page: Page | null,
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

  async wait(time: number) {
    await this.page.waitForTimeout(time)
  }

  /**
    * @example
    ```ts
    const alertPromise = javaScriptAlerts.jsAlert()
    await javaScriptAlerts.buttonForJSAlert.click()//event to open the alert
    const alert = await alertPromise
    ```
  */
  async dialog(confirmType: confirmType = 'accept', promptMessage?: string): Promise<IDialogReturn> {
    return new Promise<IDialogReturn>(resolve => {
      this.page.on('dialog', async dialog => {
        const alert: IDialogReturn = {
          type: dialog.type(),
          message: dialog.message(),
          defaultValue: dialog.defaultValue(),
          page: dialog.page()
        }
        if (confirmType === 'accept') await dialog.accept(promptMessage)
        else await dialog.dismiss()
        resolve(alert)
      })
    })
  }

  /**
    * @see PlaywrightBase.dialog() to get IDialogReturn
  */
  dialogExpects(dialog: IDialogReturn, type: dialogType, message: string) {
    expect(dialog.type).toBe(type)
    expect(dialog.message).toBe(message)
  }

} 