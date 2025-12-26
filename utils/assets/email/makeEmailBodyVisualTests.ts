import jsonReport from '../../../playwright-report/visual/report.json'
import { IEmailNotificationBody, generateEmailBodyFile } from './generateEmailBodyFile'
//const jsonReport = JSON.parse('../../playwright-report/visual/report.json')

generateEmailBodyFile(jsonReport.stats, 'visual-tests-body.json')