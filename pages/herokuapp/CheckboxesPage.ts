import { Page, Locator, TestInfo } from "@playwright/test";
import HerokuappBase from "./HerokuappBase";

export default class ChecboxePage extends HerokuappBase {
  readonly headTitle: Locator;
  readonly checkboxList: Locator;
  readonly checkbox1: Locator;
  readonly checkbox2: Locator;

  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
    this.headTitle = page.locator("h3");
    this.checkboxList = page.locator("#checkboxes > input[type=checkbox]");
    this.checkbox1 = page.locator(
      "#checkboxes > input[type=checkbox]:nth-of-type(1)",
    );
    this.checkbox2 = page.locator(
      "#checkboxes > input[type=checkbox]:nth-of-type(2)",
    );
  }

  getCheckboxLocator(checkboxIndex: number): Locator {
    return this.checkboxList.nth(checkboxIndex);
  }

  async cleanCheckboxesChecked() {
    const count = await this.checkboxList.count();
    for (let i = 0; i < count; i++) {
      this.getCheckboxLocator(i).setChecked(false);
    }
  }
}
