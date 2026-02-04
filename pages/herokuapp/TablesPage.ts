import { Locator, Page, TestInfo } from "@playwright/test"
import HerokuappBase from "./HerokuappBase"
import { SortDirection } from "../../tests/helpers/sorting";

export type HeaderTable = 'lastName' | 'firstName' | 'email' | 'due' | 'webSite' | 'action'
export type Action = 'edit' | 'delete'
export type TableIds = 'table1' | 'table2'

type HeaderLocators = {
  [K in HeaderTable]: {
    id: number;
    sortState: 'none' | 'asc' | 'desc'
    class: 'last-name' | 'first-name' | 'email' | 'dues' | 'web-site' | 'action'
  }
}

export default class TablePage extends HerokuappBase {

  readonly headTitle: Locator
  readonly headTitleText = 'Data Tables'
  private headersTable: HeaderLocators = {
    lastName: { id: 1, sortState: 'none', class: 'last-name' },
    firstName: { id: 2, sortState: 'none', class: 'first-name' },
    email: { id: 3, sortState: 'none', class: 'email' },
    due: { id: 4, sortState: 'none', class: 'dues' },
    webSite: { id: 5, sortState: 'none', class: 'web-site' },
    action: { id: 6, sortState: 'none', class: 'action' },
  }

  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo)
    this.headTitle = page.locator('h3')
  }

  getLocatorOfHeaderTable(tableId: TableIds, header: HeaderTable): Locator {
    const columnIndex = this.headersTable[header].id
    const columnClass = this.headersTable[header].class
    if (tableId == 'table1')
      return this.page.locator(`#table1 thead tr th:nth-child(${columnIndex})`)
    return this.page.locator(`#table2 thead tr th:has(span.${columnClass})`)
  }

  getColumnItems(tableId: TableIds, header: HeaderTable) {
    const columnIndex = this.headersTable[header].id
    const columnClass = this.headersTable[header].class
    if (tableId == 'table1')
      return this.page.locator(`#table1 tbody tr td:nth-child(${columnIndex})`)
    return this.page.locator(`#table2 tbody .${columnClass}`)
  }

  getLocatorCellColumn(tableId: TableIds, header: HeaderTable, row: number) {
    const columnIndex = this.headersTable[header].id
    const columnClass = this.headersTable[header].class
    if (tableId == 'table1')
      return this.page.locator(`#table1 tbody tr:nth-child(${row}) td:nth-child(${columnIndex})`)
    return this.page.locator(`#table2 tbody tr:nth-child(${row}) .${columnClass}`)
  }

  getActionLocator(tableId: TableIds, action: Action, row: number) {
    const rowLocator = this.getLocatorCellColumn(tableId, 'action', row)
    return rowLocator.locator(`text=${action}`)
  }

  getHeaderTable() {
    return this.headersTable
  }

  async getSortDirection(tableId: TableIds, header: HeaderTable) {
    const th = this.getLocatorOfHeaderTable(tableId, header)
    if (await th.evaluate(element => element.classList.contains('headerSortUp'))) {
      return 'asc'
    }
    if (await th.evaluate(element => element.classList.contains('headerSortDown'))) {
      return 'desc'
    }
    return 'none'
  }

  async clickOnColumnHeaderToSort(tableId: TableIds, header: HeaderTable) {
    await this.getLocatorOfHeaderTable(tableId, header).click()
    this.headersTable[header].sortState = await this.getSortDirection(tableId, header)
  }

  async clickOnColumnHeaderToSortUntilDirectionExpected(tableId: TableIds, header: HeaderTable, direction: SortDirection) {
    do {
      await this.getLocatorOfHeaderTable(tableId, header).click()
      this.headersTable[header].sortState = await this.getSortDirection(tableId, header)
    } while (this.headersTable[header].sortState === direction)
  }

  async validateUrlAction(action: Action) {

  }
}