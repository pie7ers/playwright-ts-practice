import { test, expect } from '@playwright/test'
import IFramesPage from '../../pages/herokuapp/IFramesPage'
import { PAGES_PATH } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'
import { IResize } from '../../pages/PlaywrightBase'

test.describe('Herokuapp IFrames Page', () => {
  let iframes: IFramesPage

  test.beforeEach(async ({ page }) => {
    iframes = new IFramesPage(page)
    await iframes.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.iframe}`)
  })

  test('validate text title', async () => {
    await expect(iframes.headTitle).toHaveText(iframes.textTitle)
    await iframes.fullScreenShot(`${iframes.mainPath}/${PAGES_PATH.iframe}/full-page`)
  })

  test.skip('validate warning box and its content', async () => {
    await expect.soft(iframes.warningContainer).toContainText(iframes.warningTextLine1)
    await expect.soft(iframes.warningContainer).toContainText(iframes.warningTextLine2BoldText)
    await expect.soft(iframes.warningTextLine2Bold).toHaveCSS('font-weight', /bold|700/)
    await expect.soft(iframes.warningContainer).toContainText(iframes.warningTextLine2)
    await expect.soft(iframes.warningContainer).toContainText(iframes.warningTextLine3)
    await expect.soft(iframes.learnMoreLink).toHaveAttribute('href', iframes.learnMoreLinkText)
  })

  test.skip('validate text area default content', async () => {
    await iframes.closeWarningContainer()
    await expect(iframes.textAreaContent).toHaveText(iframes.textAreaContentText)
    await iframes.fullScreenShot(`${iframes.mainPath}/${PAGES_PATH.iframe}/warning-box-closed`)
  })

  test.skip('validate disabled elements', async () => {
    await expect.soft(iframes.fileMenuitem).toBeDisabled()
    await expect.soft(iframes.editMenuitem).toBeDisabled()
    await expect.soft(iframes.viewMenuitem).toBeDisabled()
    await expect.soft(iframes.FormatMenuitem).toBeDisabled()
    await expect.soft(iframes.undoButton).toBeDisabled()
    await expect.soft(iframes.redoButton).toBeDisabled()
    await expect.soft(iframes.formatsToolbar).toBeDisabled()
    await expect.soft(iframes.boldToolbar).toBeDisabled()
    await expect.soft(iframes.italicToolbar).toBeDisabled()
    await expect.soft(iframes.alignLeftToolbar).toBeDisabled()
    await expect.soft(iframes.alignCenterToolbar).toBeDisabled()
    await expect.soft(iframes.alignRightToolbar).toBeDisabled()
    await expect.soft(iframes.justifyToolbar).toBeDisabled()
    await expect.soft(iframes.decreaseIndentToolbar).toBeDisabled()
    await expect.soft(iframes.increaseIndentToolbar).toBeDisabled()
  })

  test('resize text area reducing the size (only vertical)', async ({page}) => {
    const resizeOptions: IResize = {
      element: iframes.resizeButton,
      resizeY: -50,
    }

    await iframes.resizeElement(resizeOptions)
    await iframes.fullScreenShot(`${iframes.mainPath}/${PAGES_PATH.iframe}/reducing-text-area`)
  })

  test('resize text area increasing the size (only vertical)', async ({page}) => {
    const resizeOptions: IResize = {
      element: iframes.resizeButton,
      resizeY: 100,
    }

    await iframes.resizeElement(resizeOptions)
    await iframes.fullScreenShot(`${iframes.mainPath}/${PAGES_PATH.iframe}/increasing-text-area`)
  })
})