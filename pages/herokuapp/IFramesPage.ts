import { Page, Locator, FrameLocator, TestInfo } from '@playwright/test'
import HerokuappBase from './HerokuappBase'

export default class IFramesPage extends HerokuappBase {

  readonly headTitle: Locator
  readonly textTitle: string
  readonly textArea: FrameLocator
  readonly warningContainer: Locator
  readonly warningTextLine1: string
  readonly warningTextLine2Bold: Locator
  readonly warningTextLine2BoldText: string
  readonly warningTextLine2: string
  readonly warningTextLine3: string
  readonly learnMoreLink: Locator
  readonly learnMoreLinkText: string
  readonly warningCrossButton: Locator
  readonly textAreaContent: Locator
  readonly textAreaContentText: string
  readonly textAreaBox: Locator
  readonly resizeButton: Locator
  //disabled elements
  readonly fileMenuitem: Locator
  readonly editMenuitem: Locator
  readonly viewMenuitem: Locator
  readonly FormatMenuitem: Locator
  readonly undoButton: Locator
  readonly redoButton: Locator
  readonly formatsToolbar: Locator
  readonly boldToolbar: Locator
  readonly italicToolbar: Locator
  readonly alignLeftToolbar: Locator
  readonly alignCenterToolbar: Locator
  readonly alignRightToolbar: Locator
  readonly justifyToolbar: Locator
  readonly decreaseIndentToolbar: Locator
  readonly increaseIndentToolbar: Locator

  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo)
    this.headTitle = page.locator('h3')
    this.textTitle = 'An iFrame containing the TinyMCE WYSIWYG Editor'
    this.textArea = page.frameLocator('iframe[id="mce_0_ifr"]')
    this.warningContainer = page.locator('.tox-notifications-container')
    this.warningCrossButton = page.locator('.tox-notification__dismiss')
    this.warningTextLine1 = 'TinyMCE is in read-only mode because you have no more editor loads available this month.'
    this.warningTextLine2BoldText = 'Please request that the admin'
    this.warningTextLine2Bold = page.locator(`strong:has-text("${this.warningTextLine2BoldText}")`)
    this.warningTextLine2 = 'upgrade your plan'
    this.warningTextLine3 = 'or add a valid payment method for additional editor load charges.'
    this.learnMoreLink = page.locator('a:has-text("Learn More")')
    this.learnMoreLinkText = 'https://www.tiny.cloud/docs/tinymce/latest/usage-based-billing/?utm_campaign=editor_blocked_learn_more&utm_source=tiny&utm_medium=referral'
    this.textAreaContent = this.textArea.locator('body[id="tinymce"]')
    this.textAreaContentText = 'Your content goes here.'
    this.textAreaBox = this.textArea.locator('[role="application"]')
    this.resizeButton = page.locator('.tox-statusbar__resize-handle')
    //disabled elements
    this.fileMenuitem = page.getByRole('menuitem', {name: 'File'})
    this.editMenuitem = page.getByRole('menuitem', {name: 'Edit'})
    this.viewMenuitem = page.getByRole('menuitem', {name: 'View'})
    this.FormatMenuitem = page.getByRole('menuitem', {name: 'Format'})
    this.undoButton = page.locator('button[title="Undo"]')
    this.redoButton = page.locator('button[title="Redo"]')
    this.formatsToolbar = page.locator('button[title="Formats"]')
    this.boldToolbar = page.locator('button[title="Bold"]')
    this.italicToolbar = page.locator('button[title="Italic"]')
    this.alignLeftToolbar = page.locator('button[title="Align left"]')
    this.alignCenterToolbar = page.locator('button[title="Align center"]')
    this.alignRightToolbar = page.locator('button[title="Align right"]')
    this.justifyToolbar = page.locator('button[title="Justify"]')
    this.decreaseIndentToolbar = page.locator('button[title="Decrease indent"]')
    this.increaseIndentToolbar = page.locator('button[title="Increase indent"]')
  }

  async closeWarningContainer() {
    await this.warningCrossButton.click()
  }
}