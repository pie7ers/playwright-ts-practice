import { test, expect } from '@playwright/test'
import FramesPage from '../../pages/herokuapp/FramesPage'
import { FRAMES_MENU_ITEMS, PAGES_PATH} from '../../constants/herokuapp'
import { CONSTS } from '../../utils/consts'

test.describe('Herokuapp Frames Page', () => {
  let frames: FramesPage

  test.beforeEach(async ({ page }, testInfo) => {
    frames = new FramesPage(page, testInfo)
    await frames.goto(`${CONSTS.HEROKU_BASE_URL}/${PAGES_PATH.frames}`)
  })

  test('should list example links', async () => {
    const links = await frames.getExampleLinks(frames.exampleLinks)
    for(const item of FRAMES_MENU_ITEMS){
      expect(links).toContain(item)
    }
    await frames.fullScreenshot(`full-page`)
  })
})