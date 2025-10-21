import { Page, Locator } from '@playwright/test';
import HerokuappBase from './HerokuappBase';

export default class JavaScriptAlertsPage extends HerokuappBase {
  readonly headTitle: Locator
  readonly description: Locator
  readonly textTitle: string
  readonly buttonForJSAlert: Locator
  readonly buttonForJSConfirm: Locator
  readonly buttonForJSPrompt: Locator
  readonly resultText: Locator
  readonly successfullSimpleJSAlertText: string
  readonly simpleAlertMessage: string
  readonly confirmAlertMessage: string
  readonly promptAlertMessage: string
  readonly successfullConfirmJSAlertOKText: string
  readonly successfullConfirmJSAlertCancelText: string
  readonly successfullPromptJSAlertCancelText: string
  readonly successfullPromptJSAlertEmptyText: string

  constructor(page: Page) {
    super(page);
    this.headTitle = page.locator('h3')
    this.description = page.getByText('Here are some examples of different JavaScript alerts which can be troublesome for automation')
    this.textTitle = 'JavaScript Alerts'
    this.buttonForJSAlert = page.getByText("Click for JS Alert")
    this.buttonForJSConfirm = page.getByText("Click for JS Confirm")
    this.buttonForJSPrompt = page.getByText("Click for JS Prompt")
    this.successfullSimpleJSAlertText = 'You successfully clicked an alert'
    this.resultText = page.locator('[id="result"]')
    this.simpleAlertMessage = 'I am a JS Alert'
    this.confirmAlertMessage = 'I am a JS Confirm'
    this.promptAlertMessage = 'I am a JS prompt'
    this.successfullConfirmJSAlertOKText = 'You clicked: Ok'
    this.successfullConfirmJSAlertCancelText = 'You clicked: Cancel'
    this.successfullPromptJSAlertCancelText = 'You entered: null'
    this.successfullPromptJSAlertEmptyText = 'You entered: '
  }

  getSuccessfullPromptJSAlertText(complement: string){
    return `You entered: ${complement}`
  }
}