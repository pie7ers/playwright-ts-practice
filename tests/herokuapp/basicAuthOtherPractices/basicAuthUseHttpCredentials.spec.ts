import { test, expect } from '@playwright/test'
import BasicAuthPage from '../../../pages/herokuapp/BasicAuthPage'
import { PAGES_PATH } from '../../../constants/herokuapp'
import { CONSTS } from '../../../utils/consts'

test.use({
  httpCredentials: {
    username: CONSTS.HEROKU_BASIC_AUTH_USER_GLOBAL,
    password: CONSTS.HEROKU_BASIC_AUTH_PASS_GLOBAL
  }
})

test.describe('Herokuapp Basic Auth Page', () => {
  let basicAuth: BasicAuthPage

  test.beforeEach(async ({ page }, testInfo) => {
    basicAuth = new BasicAuthPage(page, testInfo)
    await basicAuth.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.basicAuth}`)
  })

  test('Basic Auth use http credentials from test file', async () => {
    await expect(basicAuth.congratulationsText).toBeVisible()
    await basicAuth.expectElementalSeleniumURL()
    await basicAuth.fullScreenshot(`${basicAuth.mainPath}/${PAGES_PATH.basicAuth}/full-page`)
  })
})