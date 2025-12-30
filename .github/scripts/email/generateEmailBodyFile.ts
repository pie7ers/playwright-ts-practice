import { writeFile } from '../../../utils/filesControl'

export interface IEmailNotificationBody {
  startTime: string
  duration: number
  expected: number
  skipped: number
  unexpected: number
  flaky: number
}

const PR_DATA = {
  GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
  GITHUB_RUN_URL: process.env.GITHUB_RUN_URL,
  GITHUB_WORKFLOW: process.env.GITHUB_WORKFLOW,
  AUTHOR: process.env.AUTHOR,
  PR_URL: process.env.PR_URL,
  PR_NUMBER: process.env.PR_NUMBER,
  PR_TITLE: process.env.PR_TITLE,
  SOURCE_BRANCH: process.env.SOURCE_BRANCH,
  DESTINATION_BRANCH: process.env.DESTINATION_BRANCH,
}

const safe = (text?: string) => text ?? 'N/A'

export function generatePRTestResultsEmailBody(data: IEmailNotificationBody) {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; font-size: 14px;">
    <p>The pipeline failed.</p>

    <p>🕐 <strong>Start Time:</strong> ${data.startTime}</p>
    <p>⏳ <strong>Duration:</strong> ${data.duration}</p>
    <p>✅ <strong>Passed:</strong> ${data.expected}</p>
    <p>⚠️ <strong>Skipped:</strong> ${data.skipped}</p>
    <p>❌ <strong>Failed:</strong> ${data.unexpected}</p>
    <p>⚖️ <strong>Flaky:</strong> ${data.flaky}</p>
    <br>
    <p><strong>Repository:</strong> ${PR_DATA.GITHUB_REPOSITORY}</p>
    <p><strong>Run URL:</strong> <a href="${PR_DATA.GITHUB_RUN_URL}">View Execution</a></p>
    <p><strong>Workflow:</strong> ${PR_DATA.GITHUB_WORKFLOW}</p>
    <p><strong>Author:</strong> ${safe(PR_DATA.AUTHOR)}</p>
    <p><strong>PR URL:</strong> <a href="${PR_DATA.PR_URL}">#${PR_DATA.PR_NUMBER}</a></p>
    <p><strong>PR Title:</strong> ${PR_DATA.PR_TITLE}</p>
    <p><strong>Source Branch:</strong> ${PR_DATA.SOURCE_BRANCH}</p>
    <p><strong>Destination Branch:</strong> ${PR_DATA.DESTINATION_BRANCH}</p>
  </body>
</html>
  `
}

export function writeHTMLBodyFile(htmlBody: string, destinationPath: string){
  writeFile(destinationPath, htmlBody)
}