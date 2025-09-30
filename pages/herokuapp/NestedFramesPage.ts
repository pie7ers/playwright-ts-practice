import { Page, Locator, FrameLocator } from '@playwright/test';
import HerokuappBase from './HerokuappBase';

export default class NestedFramesPage  extends HerokuappBase {

  readonly frameTop: Locator;
  readonly frameLocatorTop: FrameLocator;
  readonly frameLocatorLeft: FrameLocator;
  readonly frameLocatorMiddle: FrameLocator;
  readonly frameLocatorRight: FrameLocator;
  readonly frameLocatorBottom: FrameLocator;

  constructor(page: Page) {
    super(page);
    this.frameTop = page.locator('frame[name="frame-top"]')
    this.frameLocatorTop = page.frameLocator('frame[name="frame-top"]')
    this.frameLocatorLeft = this.frameLocatorTop.frameLocator('frame[name="frame-left"]')
    this.frameLocatorMiddle = this.frameLocatorTop.frameLocator('frame[name="frame-middle"]')
    this.frameLocatorRight = this.frameLocatorTop.frameLocator('frame[name="frame-right"]')
    this.frameLocatorBottom = page.frameLocator('frame[name="frame-bottom"]')
  }
}