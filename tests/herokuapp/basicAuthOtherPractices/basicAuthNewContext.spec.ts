import { test, expect, chromium, BrowserContext, Browser } from '@playwright/test'
import BasicAuthPage from '../../../pages/herokuapp/BasicAuthPage'
import { PAGES_PATH } from '../../../constants/herokuapp'
import { CONSTS } from '../../../utils/consts'

test.describe('Herokuapp Basic Auth Page', () => {
  let basicAuth: BasicAuthPage
  let adminContext: BrowserContext
  let browser: Browser

  test.beforeEach(async ({}, testInfo) => {
    browser = await chromium.launch()
    adminContext = await browser.newContext({
      httpCredentials: {
        username: CONSTS.HEROKU_BASIC_AUTH_USER_CHROMIUM,
        password: CONSTS.HEROKU_BASIC_AUTH_PASS_CHROMIUM
      }
    })

    const pageAdmin = await adminContext.newPage()
    basicAuth = new BasicAuthPage(pageAdmin, testInfo)
    await basicAuth.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.basicAuth}`)
  })

  test('Basic Auth new context', async () => {
    await expect(basicAuth.congratulationsText).toBeVisible()
    await basicAuth.expectElementalSeleniumURL()
    await basicAuth.fullScreenshot(`full-page`)
  })

  test.afterAll(async ()=> {
    await browser.close()
    await adminContext.close()
  })
})