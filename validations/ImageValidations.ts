import { expect, Locator } from "@playwright/test";
import GeneralValidations from "./GeneralValidations";

export default class ImageValidations extends GeneralValidations {
  constructor(locator: Locator) {
    super(locator)
  }

  /* 
    send the expected when you want to force a value
  */
  async isBroken(expected?: boolean) {
    const isBroken = await this.locator?.evaluate((node: HTMLImageElement) => !node.complete || node.naturalWidth === 0)
    expect.soft(expected ?? isBroken, `image ${this.locator} is broken`).toBeFalsy()
    return this
  }
}