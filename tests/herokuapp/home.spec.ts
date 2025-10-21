import { test, expect } from '@playwright/test'
import HomePage from '../../pages/herokuapp/HomePage'
import { HOME_MENU_ITEMS } from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'

test.describe('Herokuapp Home Page', () => {
  let home: HomePage
  let evidencePath: string

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page)
    evidencePath = `${home.mainPath}/home`
    await home.goto(CONSTS.HEROKU_BASE_URL)
  })

  test('should display the correct heading', async () => {
    const headingText = await home.getHeadingText(home.headTitle)
    expect(headingText).toBe('Welcome to the-internet')
    await home.fullScreenShot(`${evidencePath}/home-heading`)
  })

  test('should list example links', async () => {
    const links = await home.getExampleLinks(home.exampleLinks)
    expect(links.length).toBe(HOME_MENU_ITEMS.length)
    for (const item of HOME_MENU_ITEMS) {
      expect(links).toContain(item)
    }
  })

  test('should navigate to A/B Testing page when link is clicked', async ({ page }) => {
    await home.clickExampleLink('A/B Testing')
    await expect(page).toHaveURL(/\/abtest/)
    await expect(page.locator('h3')).toContainText('A/B Test')
    await home.fullScreenShot(`${evidencePath}/ab-testing-page`)
  })

  test('should navigate to Frames page when link is clicked', async ({ page }) => {
    await home.clickExampleLink('Frames')
    await expect(page).toHaveURL(/\/frames/)
    await expect(page.locator('h3')).toContainText('Frames')

    await home.fullScreenShot(`${evidencePath}/frames-page`)
  })
})