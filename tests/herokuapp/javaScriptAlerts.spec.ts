import { test, expect } from '@playwright/test'
import JavaScriptAlertsPage from '../../pages/herokuapp/JavaScriptAlertsPage'
import { PAGES_PATH } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'

test.describe('JavaScript Alerts', async () => {

  let javaScriptAlerts: JavaScriptAlertsPage;

  test.beforeEach(async ({ page }, testInfo) => {
    javaScriptAlerts = new JavaScriptAlertsPage(page, testInfo)
    javaScriptAlerts.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.javaScriptAlerts}`)
  })

  test('Validate text title and description', async () => {
    await expect(javaScriptAlerts.headTitle).toHaveText(javaScriptAlerts.textTitle)
    await expect(javaScriptAlerts.description).toBeVisible()
    await javaScriptAlerts.expectElementalSeleniumURL()
    await javaScriptAlerts.fullScreenshot(`full-page`)
  })

  test('Validate JS Alert', async () => {
    const dialogPromise = javaScriptAlerts.dialog()
    await javaScriptAlerts.buttonForJSAlert.click()
    const dialog = await dialogPromise
    javaScriptAlerts.dialogExpects(
      dialog,
      'alert',
      javaScriptAlerts.simpleAlertMessage
    )
    await expect(javaScriptAlerts.resultText).toHaveText(javaScriptAlerts.successfullSimpleJSAlertText)
    await javaScriptAlerts.fullScreenshot(`js-alert-result`)
  })

  test('Validate JS confirm dialog, confirming', async () => {
    const dialogPromise = javaScriptAlerts.dialog()
    await javaScriptAlerts.buttonForJSConfirm.click()
    const dialog = await dialogPromise
    javaScriptAlerts.dialogExpects(
      dialog,
      'confirm',
      javaScriptAlerts.confirmAlertMessage
    )
    await expect(javaScriptAlerts.resultText).toHaveText(javaScriptAlerts.successfullConfirmJSAlertOKText)
    await javaScriptAlerts.fullScreenshot(`js-confirm-result-ok`)
  })

  test('Validate JS confirm dialog, dismissing', async () => {
    const dialogPromise = javaScriptAlerts.dialog('dismiss')
    await javaScriptAlerts.buttonForJSConfirm.click()
    const dialog = await dialogPromise
    javaScriptAlerts.dialogExpects(
      dialog,
      'confirm',
      javaScriptAlerts.confirmAlertMessage
    )
    await expect(javaScriptAlerts.resultText).toHaveText(javaScriptAlerts.successfullConfirmJSAlertCancelText)
    await javaScriptAlerts.fullScreenshot(`js-confirm-result-cancel`)
  })

  test('Validate JS prompt dialog, dismissing', async () => {
    const dialogPromise = javaScriptAlerts.dialog('dismiss')
    await javaScriptAlerts.buttonForJSPrompt.click()
    const dialog = await dialogPromise
    javaScriptAlerts.dialogExpects(
      dialog,
      'prompt',
      javaScriptAlerts.promptAlertMessage
    )
    await expect(javaScriptAlerts.resultText).toHaveText(javaScriptAlerts.successfullPromptJSAlertCancelText)
    await javaScriptAlerts.fullScreenshot(`js-prompt-result-cancel`)
  })

  test('Validate JS prompt dialog, confirm empty text', async () => {
    const dialogPromise = javaScriptAlerts.dialog()
    await javaScriptAlerts.buttonForJSPrompt.click()
    const dialog = await dialogPromise
    javaScriptAlerts.dialogExpects(
      dialog,
      'prompt',
      javaScriptAlerts.promptAlertMessage
    )
    await expect(javaScriptAlerts.resultText).toHaveText(javaScriptAlerts.successfullPromptJSAlertEmptyText)
    await javaScriptAlerts.fullScreenshot(`js-prompt-result-empty-text`)
  })

  test('Validate JS prompt dialog, confirm with text', async () => {
    const textComplement = 'prompt, test text 😀'
    const dialogPromise = javaScriptAlerts.dialog('accept', textComplement)
    await javaScriptAlerts.buttonForJSPrompt.click()
    const dialog = await dialogPromise
    javaScriptAlerts.dialogExpects(
      dialog,
      'prompt',
      javaScriptAlerts.promptAlertMessage
    )
    await expect(javaScriptAlerts.resultText).toHaveText(javaScriptAlerts.getSuccessfullPromptJSAlertText(textComplement))
    await javaScriptAlerts.fullScreenshot(`js-prompt-result-text`)
  })
})