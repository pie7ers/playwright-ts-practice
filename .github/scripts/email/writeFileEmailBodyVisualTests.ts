import { readDataFile } from '../../../utils/filesControl'
import { generatePRTestResultsEmailBody, writeHTMLBodyFile } from './generateEmailBodyFile'
const jsonReport = JSON.parse(readDataFile('playwright-report/visual/report.json') as string)

const htmlBody = generatePRTestResultsEmailBody(jsonReport?.stats)
writeHTMLBodyFile(htmlBody, 'dist/assets/visual-tests-body.html')