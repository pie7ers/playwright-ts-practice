import { test, expect, chromium, BrowserContext, Browser } from '@playwright/test'
import BasicAuthPage from '../../../pages/herokuapp/BasicAuthPage'
import { PAGES_PATH } from '../../../constants/herokuapp'
import { CONSTS } from '../../../utils/consts'

test.describe('Herokuapp Basic Auth Page', () => {
  let basicAuth: BasicAuthPage
  let adminContext: BrowserContext
  let browser: Browser

  test.beforeEach(async () => {
    browser = await chromium.launch()
    adminContext = await browser.newContext({
      httpCredentials: {
        username: CONSTS.BASIC_AUTH_USER_CHROMIUM,
        password: CONSTS.BASIC_AUTH_PASS_CHROMIUM
      }
    })

    const pageAdmin = await adminContext.newPage()
    basicAuth = new BasicAuthPage(pageAdmin)
    await basicAuth.goto(`${CONSTS.BASE_URL}/${PAGES_PATH.basicAuth}`)
  })

  test('Basic Auth new context', async () => {
    await expect(basicAuth.congratulationsText).toBeVisible()
    await basicAuth.expectElementalSeleniumURL()
    await basicAuth.fullScreenShot(`${basicAuth.mainPath}/${PAGES_PATH.basicAuth}/full-page`)
  })

  test.afterAll(async ()=> {
    await browser.close()
    await adminContext.close()
  })
})