import { test } from '@playwright/test'
import HomePage from '../../../pages/herokuapp/HomePage'
import { CONSTS } from '../../../utils/consts'

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
    await home.visualTest('home-1.png')
    await home.scrollToTheEndOfThePage()
    await home.visualTest('home-2-footer.png')
  })

  test('should navigate to A/B Testing page when link is clicked', async () => {
    await home.clickExampleLink('A/B Testing')
    await home.visualTest('a-b-test-control.png')
  })

  test('should navigate to Frames page when link is clicked', async () => {
    await home.clickExampleLink('Frames')
    await home.visualTest('frames.png')
  })
})