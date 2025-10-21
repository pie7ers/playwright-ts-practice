import { test, expect } from '@playwright/test'
import DigestAuthPage from '../../../pages/herokuapp/DigestAuthPage'
import { PAGES_PATH } from '../../../constants/herokuapp'

test.describe('Digest Authetication using digest-fetch', async () => {

  let digestAuth: DigestAuthPage;

  test.beforeEach(async ({ page }) => {
    digestAuth = new DigestAuthPage(page)
    await digestAuth.getDigestAuthState()
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