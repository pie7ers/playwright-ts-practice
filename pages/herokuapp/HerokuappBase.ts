import { Page, Locator, expect, TestInfo } from "@playwright/test";
import PlaywrightBase from "../PlaywrightBase";
import { request, RequestOptions } from 'urllib';
import { CONSTS } from "../../utils/consts";

export default class HerokuappBase extends PlaywrightBase {

  readonly exampleLinks: Locator;
  readonly footherPoweredBy: Locator;
  readonly mainPath = 'herokuapp';

  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
    this.exampleLinks = page.locator('ul li a');
    this.footherPoweredBy = page.getByRole('link', { name: 'Elemental Selenium' })
  }

  getPage(){
    return this.page
  }

  async clickExampleLink(linkText: string) {
    await this.page.click(`ul li a:has-text("${linkText}")`);
  }

  async expectElementalSeleniumURL() {
    await expect.soft(this.footherPoweredBy).toHaveAttribute('href', 'http://elementalselenium.com/')
  }

  //base on https://medium.com/@thananjayan1988/web-authentication-with-playwright-basic-and-digest-explained-aab9ce78dc3e
  async digestAuthState() {

    const options: RequestOptions = {
      digestAuth: `${CONSTS.HEROKU_BASIC_AUTH_USER_GLOBAL}:${CONSTS.HEROKU_BASIC_AUTH_PASS_GLOBAL}`,
      method: 'GET'
    }

    await this.page.route('**/digest_auth', async (route, req) => {
      const { res, data } = await request(req.url(), options);
      const headers: any = {
        ...res.headers
      }
      await route.fulfill({
        status: res.statusCode,
        headers: headers,
        contentType: res.headers['content-type'],
        body: data
      });
    })
  }

}