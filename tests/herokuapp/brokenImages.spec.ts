import { test, expect } from '@playwright/test'
import BrokenImagesPage from '../../pages/herokuapp/BrokenImagesPage'
import { PAGES_PATH } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'

test.describe('Broken Images Page', () => {
  let brokenImages: BrokenImagesPage

  test.beforeEach(async ({ page }, testInfo) => {
    brokenImages = new BrokenImagesPage(page, testInfo)
    await brokenImages.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.brokenImages}`)
  })

  test('Validate Broken Images title', async () => {
    const title = await brokenImages.getHeadingText(brokenImages.headTitle)
    expect(title).toBe(brokenImages.headTitleText)
    brokenImages.expectElementalSeleniumURL()
    await brokenImages.fullScreenshot(`full-page`)
  })

  //forcing the value for the broken images
  test('Validate all images', async () => {
    const images = brokenImages.images
    await brokenImages.expectImages(images, 'jpg', false)
  })

  test('Validate one broken image', async () => {
    const image = brokenImages.firstImage
    await brokenImages.expectImages(image, 'jpg', false)
  })

  //ideal example without force the value
  test('Validate one NO broken image', async () => {
    const image = brokenImages.lastImage
    await brokenImages.expectImages(image, 'jpg')
  })
})