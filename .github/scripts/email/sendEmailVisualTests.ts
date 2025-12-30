import { readDataFile } from '../../../utils/filesControl';
import { generatePRTestResultsEmailBody } from './generateEmailBodyFile';
import { sendEmailViaSendgrid, IMessageSendgrid } from '../../../adapters/sendgrid';
import { SENDGRID } from '../../../utils/env/sendgrid.env';

(async function () {

  const jsonReport = JSON.parse(readDataFile('playwright-report/visual/report.json') as string);
  const htmlBody = generatePRTestResultsEmailBody(jsonReport?.stats);

  const message: IMessageSendgrid = {
    to: SENDGRID.EMAIL_TO,
    from: SENDGRID.EMAIL_FROM,
    subject: '❌ CI Failed 🤖',
    text: 'Pipe line failed',
    html: htmlBody
  }
  await sendEmailViaSendgrid(message)
})()