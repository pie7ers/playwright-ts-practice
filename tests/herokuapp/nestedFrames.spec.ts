import { test, expect } from '@playwright/test'
import NestedFramesPage from '../../pages/herokuapp/NestedFramesPage'
import { PAGES_PATH } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'

test.describe('Herokuapp Frames Page', () => {
  let frames: NestedFramesPage

  test.beforeEach(async ({ page }) => {
    frames = new NestedFramesPage(page)
    await frames.goto(`${CONSTS.BASE_URL}/${PAGES_PATH.nestedFrames}`)
  })

  test('validate frame top', async () => {
    await expect(frames.frameTop).toHaveAttribute('name', 'frame-top')
    const evidencePath = `${frames.mainPath}/nestedframes`
    await frames.fullScreenShot(`${evidencePath}/full-page`)
  })

  test('validate frame left', async () => {
    await expect(frames.frameLocatorLeft.locator('body')).toContainText('LEFT')
  })

  test('validate frame middle', async () => {
    await expect(frames.frameLocatorMiddle.locator('body')).toContainText('MIDDLE')
  })

  test('validate frame right', async () => {
    await expect(frames.frameLocatorRight.locator('body')).toContainText('RIGHT')
  })
})