import { test, expect } from '@playwright/test'
import DigestAuthPage from '../../pages/herokuapp/DigestAuthPage'
import { PAGES_PATH } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'

//for this tests it's necessary has httpCredentials in playwright.config.ts
test.describe('Digest Authetication using as Basic', async () => {

  let digestAuth: DigestAuthPage;

  test.beforeEach(async ({ page }) => {
    digestAuth = new DigestAuthPage(page)
    await digestAuth.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.digestAuth}`)
  })

  test('Validate text title', async () => {
    await expect(digestAuth.headTitle).toHaveText(digestAuth.textTitle)
  })

  test('Digest Auth new context', async () => {
    await expect(digestAuth.congratulationsText).toBeVisible()
    await digestAuth.expectElementalSeleniumURL()
    await digestAuth.fullScreenShot(`${digestAuth.mainPath}/${PAGES_PATH.digestAuth}/full-page`)
  })
})