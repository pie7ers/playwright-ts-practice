import { writeFile } from '../../filesControl'

export interface IEmailNotificationBody {
  startTime: string
  duration: number
  expected: number
  skipped: number
  unexpected: number
  flaky: number
}

export function generateEmailBodyFile(data: IEmailNotificationBody, destinationPath: string) {
  const emailBody = `
  🕐 Start Time: ${data.startTime}
  ⏳ Duration: ${data.duration}
  ✅ Passed: ${data.expected}
  ⚠️ Skipped: ${data.skipped}
  ❌ Failed: ${data.unexpected}
  ⚖️ Flaky: ${data.flaky}
  `
  writeFile(destinationPath, emailBody)
}