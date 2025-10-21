import { Page, Locator, BrowserContext } from '@playwright/test';
import HerokuappBase from './HerokuappBase';
import { CONSTS } from "../../utils/consts";
import { PAGES_PATH } from "../../constants/herokuapp";

export default class BasicAuthPage extends HerokuappBase {
  readonly headTitle: Locator
  readonly congratulationsText: Locator
  readonly textTitle: string

  constructor(page: Page) {
    super(page);
    this.headTitle = page.locator('h3');
    this.congratulationsText = page.getByText('Congratulations! You must have the proper credentials.')
    this.textTitle = 'Digest Auth'
  }

  async getDigestAuthState() {
    const { default: DigestFetch } = await import('digest-fetch');
    const client = new DigestFetch(CONSTS.HEROKU_BASIC_AUTH_USER_GLOBAL, CONSTS.HEROKU_BASIC_AUTH_PASS_GLOBAL);

    const url = `${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.digestAuth}`;
    const response = await client.fetch(url);

    if (!response.ok) {
      throw new Error(`❌ Digest auth failed: ${response.status}`);
    }

    const html = await response.text();
    this.page.context().storageState({path: './artifacts/auth.json'})
    await this.page.setContent(html);
  }
}