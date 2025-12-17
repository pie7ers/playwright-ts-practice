import { test, expect } from '@playwright/test'
import TablesPage from '../../pages/herokuapp/TablesPage'
import { PAGES_PATH } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'

let tablesPage: TablesPage

test.describe(`Herokuapp Tables Page`, () => {

  test.beforeEach(async ({ page }) => {
    tablesPage = new TablesPage(page)
    await tablesPage.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.tables}`)
  })

  test('should display the correct heading', async () => {
    const title = await tablesPage.getHeadingText(tablesPage.headTitle)
    expect.soft(title).toBe(tablesPage.headTitleText)
    await tablesPage.fullScreenShot(`${tablesPage.mainPath}/${PAGES_PATH.tables}`)
  })

})