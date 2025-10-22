import { expect, Locator } from "@playwright/test";
import { TypeImageExtensions } from "../models/images";

export type TypeExtensions = TypeImageExtensions | 'pdf'

export default class GeneralValidations {
  protected locator: Locator

  constructor(locator: Locator) {
    this.locator = locator
  }

  async isVisible(message?: string) {
    message = message ? message : `the element ${this.locator} is not visible`
    await expect.soft(this.locator, message).toBeVisible()
    return this
  }

  async validateExtension(expectedExtension: TypeExtensions) {
    const src = await this.locator.getAttribute('src')
    const imagePathParts = src?.split('.')
    const extension = imagePathParts?.at(-1)
    expect.soft(extension, `wrong extension for ${this.locator} real extension ${extension}`).toBe(expectedExtension)
    return this
  }

}