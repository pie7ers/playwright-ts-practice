import { test, expect } from '@playwright/test'
import CheckboxesPage from '../../pages/herokuapp/CheckboxesPage'
import { PAGES_PATH } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'

test.describe('Checboxes Page', () => {
  let checkboxes: CheckboxesPage

  test.beforeEach(async ({ page }) => {
    checkboxes = new CheckboxesPage(page)
    await checkboxes.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.checkboxes}`)
    await checkboxes.cleanCheckboxesChecked()
  })

  test('Select both checkboxes with check function', async () => {
    checkboxes.expectElementalSeleniumURL();
    await expect(checkboxes.checkbox1).not.toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenShot(`${checkboxes.mainPath}/${PAGES_PATH.checkboxes}/01-1-boxes-no-checked`)
    await checkboxes.checkbox1.check();
    await expect(checkboxes.checkbox1).toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenShot(`${checkboxes.mainPath}/${PAGES_PATH.checkboxes}/01-2-only-box-one-checked`)
    await checkboxes.checkbox2.check();
    await expect(checkboxes.checkbox2).toBeChecked();
    await checkboxes.fullScreenShot(`${checkboxes.mainPath}/${PAGES_PATH.checkboxes}/01-3-boxes-checked`)
  })

  test('Check checkboxes with click function', async () => {
    checkboxes.expectElementalSeleniumURL();
    await expect(checkboxes.checkbox1).not.toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenShot(`${checkboxes.mainPath}/${PAGES_PATH.checkboxes}/02-1-boxes-no-checked`)
    await checkboxes.checkbox1.click();
    await expect(checkboxes.checkbox1).toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenShot(`${checkboxes.mainPath}/${PAGES_PATH.checkboxes}/02-2-only-box-one-checked`)
    await checkboxes.checkbox2.click();
    await expect(checkboxes.checkbox2).toBeChecked();
    await checkboxes.fullScreenShot(`${checkboxes.mainPath}/${PAGES_PATH.checkboxes}/02-3-boxes-checked`)
  })

  test('Check checkboxes with setChecked function', async () => {
    checkboxes.expectElementalSeleniumURL();
    await expect(checkboxes.checkbox1).not.toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenShot(`${checkboxes.mainPath}/${PAGES_PATH.checkboxes}/02-1-boxes-no-checked`)
    await checkboxes.checkbox1.setChecked(true);
    await expect(checkboxes.checkbox1).toBeChecked();
    await expect(checkboxes.checkbox2).not.toBeChecked();
    await checkboxes.fullScreenShot(`${checkboxes.mainPath}/${PAGES_PATH.checkboxes}/02-2-only-box-one-checked`)
    await checkboxes.checkbox2.setChecked(true);
    await expect(checkboxes.checkbox2).toBeChecked();
    await checkboxes.fullScreenShot(`${checkboxes.mainPath}/${PAGES_PATH.checkboxes}/02-3-boxes-checked`)
  })
})