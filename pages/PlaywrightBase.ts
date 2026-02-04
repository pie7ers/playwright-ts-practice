import { Locator, Page, expect, TestInfo } from "@playwright/test";
import ImageValidations from "../validations/ImageValidations";
import { TypeImageExtensions } from "../models/images";
import {
  SortDirection,
  sortElementsByDirecction,
} from "../tests/helpers/sorting";
import { getStringKebabCase, getTestPathKebabCase } from "../utils/strings";

export type DialogType = "alert" | "confirm" | "prompt";
export type ConfirmType = "accept" | "dismiss";
export interface IResize {
  element: Locator;
  resizeX?: number;
  resizeY?: number;
}

interface IDialogReturn {
  type: string;
  message: string;
  defaultValue: string;
  page: Page | null;
}

interface ISanpshot {
  maxDiffPixelRatio?: number;
  maxDiffPixels?: number;
  threshold?: number;
}

export default class PlaywrightBase {
  readonly page: Page;
  readonly testInfo: TestInfo;
  private screenshotCount: number = 0;

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
    if (!testInfo) {
        console.error("❌CRITICAL: testInfo is missing in constructor!");
    }
  }

  async goto(urlPage: string = "") {
    await this.page.goto(urlPage);
  }

  async clickWithRedirectionToURL(locator: Locator, urlExpected: string) {
    await locator.click();
    await this.page.waitForURL(urlExpected, { timeout: 5000 });
    expect.soft(this.page.url()).toBe(urlExpected);
  }

  async attachImagesToTheReport(fileName: string, screenshot: Buffer) {
    if (this.testInfo) {
      await this.testInfo.attach(fileName, {
        body: screenshot,
        contentType: "image/png",
      });
    }
  }

  async fullScreenshot(complement?: string) {
    this.screenshotCount++;
    complement = complement ? "-" + complement : "";
    if(!this.testInfo?.title){
      throw new Error(`to use fullScreenshot function it's necesary add testInfo to the page class`)
    }
    const stepNumber = String(this.screenshotCount).padStart(2, "0");
    const name = `${getStringKebabCase(this.testInfo.title)}-img-${stepNumber}${complement}`;
    const path = `evidences${getTestPathKebabCase(this.testInfo.titlePath, name)}`;

    const screenshot = await this.page.screenshot({
      path,
      fullPage: true,
    });
    await this.attachImagesToTheReport(name, screenshot);
  }

  async getHeadingText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || "";
  }

  async getExampleLinks(locator: Locator): Promise<string[]> {
    return locator.evaluateAll((links) =>
      links.map(
        (link) => (link as HTMLAnchorElement).textContent?.trim() || "",
      ),
    );
  }

  async resizeElement(options: IResize) {
    const box = await options.element.boundingBox();
    if (!box) throw new Error(`element ${options.element} not found`);

    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();

    await this.page.mouse.move(
      startX + (options.resizeX || 0),
      startY + (options.resizeY || 0),
      { steps: 20 }, //simulate a slow drag
    );

    await this.page.mouse.up();
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  /**
    * @example
    ```ts
    const alertPromise = javaScriptAlerts.jsAlert()
    await javaScriptAlerts.buttonForJSAlert.click()//event to open the alert
    const alert = await alertPromise
    ```
  */
  async dialog(
    confirmType: ConfirmType = "accept",
    promptMessage?: string,
  ): Promise<IDialogReturn> {
    return new Promise<IDialogReturn>((resolve) => {
      this.page.on("dialog", async (dialog) => {
        const alert: IDialogReturn = {
          type: dialog.type(),
          message: dialog.message(),
          defaultValue: dialog.defaultValue(),
          page: dialog.page(),
        };
        if (confirmType === "accept") await dialog.accept(promptMessage);
        else await dialog.dismiss();
        resolve(alert);
      });
    });
  }

  /**
   * @see PlaywrightBase.dialog() to get IDialogReturn
   */
  dialogExpects(dialog: IDialogReturn, type: DialogType, message: string) {
    expect.soft(dialog.type).toBe(type);
    expect.soft(dialog.message).toBe(message);
  }

  async expectImages(
    locator: Locator,
    expectedExtension: TypeImageExtensions | TypeImageExtensions[],
    expectIsBroken?: boolean | boolean[],
  ) {
    const count = await locator.count();
    for (let i = 0; i < count; i++) {
      const image = locator.nth(i);
      const extension = Array.isArray(expectedExtension)
        ? expectedExtension[i]
        : expectedExtension;
      const isBroken = Array.isArray(expectIsBroken)
        ? expectIsBroken[i]
        : expectIsBroken;
      const expects = new ImageValidations(image);
      await expects.isVisible();
      await expects.isBroken(isBroken);
      await expects.validateExtension(extension);
    }
  }

  /**
   * to avoid issues with OS it's recommended to add the attribute snapshotPathTemplate into the plawyright.config.ts
   * example: 
   * ```ts
   * export default defineConfig({
      testDir: './tests',
      snapshotPathTemplate: '{snapshotDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}',
      //output: tests/herokuapp/visual/home.spec.ts-snapshots/a-b-test-control-chromium.png
   * })
   * ```
   * @param snapshotName to know how place the proper value check https://playwright.dev/docs/test-snapshots#generating-screenshots
   * old alternative expect.soft(await this.page.screenshot()).toMatchSnapshot(snapshotName, snapshotOptions)
   * @example visualTest('home-1.png')
   * -
   * the image name should it be like: image-name-browserName-darwin.png (each browser should have a sample)
   * "home-1-chromium-darwin.png"
  */
  async visualTest(snapshotName: string, snapshotOptions?: ISanpshot) {
    await expect
      .soft(this.page)
      .toHaveScreenshot(snapshotName, snapshotOptions);
  }

  async scrollToTheEndOfThePage() {
    await this.page.evaluate(() => {
      window.scroll(0, document.body.scrollHeight);
    });
  }

  async scrollToElementIntoView(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  printViewport() {
    console.log("VIEWPORT: ", this.page.viewportSize());
  }

  async validateUrl(url: string): Promise<void> {
    await expect.soft(this.page).toHaveURL(url);
  }

  validateSort(elements: Array<string | number>, sortType: SortDirection) {
    const expectedSort = sortElementsByDirecction(elements, sortType);
    expect.soft(elements).toEqual(expectedSort);
  }

  async getAllAttributesOfDOMElement(
    locator: Locator,
  ): Promise<Record<string, any>> {
    return locator.evaluate((element) =>
      Object.fromEntries(
        Array.from(element.attributes).map((attr) => [attr.name, attr.value]),
      ),
    );
  }
}
