import { readDataFile } from '../../../utils/filesControl'
import { generateEmailBodyFile } from './generateEmailBodyFile'
const jsonReport = JSON.parse(readDataFile('../playwright-report/visual/report.json') as string)

generateEmailBodyFile(jsonReport?.stats, '.github/scripts/email/visual-tests-body.txt')