import { test, expect } from '@playwright/test'
import TablesPage, { HeaderTable, TableIds } from '../../../pages/herokuapp/TablesPage'
import { PAGES_PATH } from '../../../constants/herokuapp'
import { CONSTS } from '../../../utils/consts'
import { sortingCases } from '../data/tables.sorting.cases'
import { actionCases } from '../data/tables.action.cases'


export function runTableTests(tableId: TableIds) {
  let tablesPage: TablesPage
  const headers: HeaderTable[] = ["lastName", "firstName", "email", "due", "webSite", "action"]

  test.describe(`Herokuapp Tables Page ${tableId}`, () => {

    test.beforeEach(async ({ page }, testInfo) => {
      tablesPage = new TablesPage(page, testInfo)
      await tablesPage.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.tables}`)
    })

    test.describe.parallel('Validate Sorting', () => {
      sortingCases.forEach(({ header, description, direction }) => {
        test(`Should ${description} and sort direction is ${direction}`, async () => {
          await tablesPage.clickOnColumnHeaderToSortUntilDirectionExpected(tableId, header, direction)
          const elements = await tablesPage.getColumnItems(tableId, header).allTextContents()
          tablesPage.validateSort(elements, direction)
        })
      })
    })

    test.describe.parallel('Validate Actions', () => {
      actionCases.forEach(({ description, action }) => {
        test(`Should ${description} for all rows`, async ({ page }) => {
          const rowsNumber = (await tablesPage.page.locator(`${tableId} th`).allTextContents()).length
          for (let row = 1; row <= rowsNumber; row++) {
            const locator = tablesPage.getActionLocator(tableId, action, row)
            await locator.click()
          }
        })
      })
    })

  })
}