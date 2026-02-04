import { test, expect } from '@playwright/test'
import CheckboxesPage from '../../pages/herokuapp/CheckboxesPage'
import { PAGES_PATH } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'

test.describe('Checboxes Page', () => {
  let checkboxes: CheckboxesPage

  test.beforeEach(async ({ page }, testInfo) => {
    checkboxes = new CheckboxesPage(page, testInfo)
    await checkboxes.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.checkboxes}`)
    await checkboxes.cleanCheckboxesChecked()
  })

  test('Check checkboxes with check function', async () => {
    checkboxes.expectElementalSeleniumURL();
    await expect(checkboxes.checkbox1).not.toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenshot(`boxes-no-checked`)
    await checkboxes.checkbox1.check();
    await expect(checkboxes.checkbox1).toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenshot(`only-box-one-checked`)
    await checkboxes.checkbox2.check();
    await expect(checkboxes.checkbox2).toBeChecked();
    await checkboxes.fullScreenshot(`boxes-checked`)
  })

  test('Check checkboxes with click function', async () => {
    checkboxes.expectElementalSeleniumURL();
    await expect(checkboxes.checkbox1).not.toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenshot(`boxes-no-checked`)
    await checkboxes.checkbox1.click();
    await expect(checkboxes.checkbox1).toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenshot(`only-box-one-checked`)
    await checkboxes.checkbox2.click();
    await expect(checkboxes.checkbox2).toBeChecked();
    await checkboxes.fullScreenshot(`boxes-checked`)
  })

  test('Check checkboxes with setChecked function', async () => {
    checkboxes.expectElementalSeleniumURL();
    await expect(checkboxes.checkbox1).not.toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenshot(`boxes-no-checked`)
    await checkboxes.checkbox1.setChecked(true);
    await expect(checkboxes.checkbox1).toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenshot(`only-box-one-checked`)
    await checkboxes.checkbox2.setChecked(true);
    await expect(checkboxes.checkbox2).toBeChecked();
    await checkboxes.fullScreenshot(`boxes-checked`)
  })
})