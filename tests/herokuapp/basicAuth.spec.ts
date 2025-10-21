import { test, expect } from '@playwright/test'
import BasicAuthPage from '../../pages/herokuapp/BasicAuthPage'
import { PAGES_PATH } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'


test.describe('Herokuapp Basic Auth Page', () => {
  let basicAuth: BasicAuthPage

  test.beforeEach(async ({ page }) => {
    basicAuth = new BasicAuthPage(page)
    await basicAuth.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.basicAuth}`)
  })

  test('Validate text title', async () => {
    await expect(basicAuth.headTitle).toHaveText(basicAuth.textTitle)
  })

  test('Basic Auth use http credentials from test file', async () => {
    await expect(basicAuth.congratulationsText).toBeVisible()
    await basicAuth.expectElementalSeleniumURL()
    await basicAuth.fullScreenShot(`${basicAuth.mainPath}/${PAGES_PATH.basicAuth}/full-page`)
  })
})