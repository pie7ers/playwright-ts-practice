import 'dotenv/config';
import env from 'env-var';

const E2E_PATH = 'playwright-report/e2e'
const VISUAL_PATH = 'playwright-report/visual'
const E2E_FILE_JSON = 'report.json'
const E2E_FILE_JUNIT = 'report.xml'

export const CONSTS = {
  HEROKU_BASE_URL: env.get('HEROKU_BASE_URL').required().asString(),
  HEROKU_BASIC_AUTH_USER_GLOBAL: env.get('HEROKU_BASIC_AUTH_USER_GLOBAL').required().asString(),
  HEROKU_BASIC_AUTH_PASS_GLOBAL: env.get('HEROKU_BASIC_AUTH_PASS_GLOBAL').required().asString(),
  HEROKU_BASIC_AUTH_USER_CHROMIUM: env.get('HEROKU_BASIC_AUTH_USER_CHROMIUM').required().asString(),
  HEROKU_BASIC_AUTH_PASS_CHROMIUM: env.get('HEROKU_BASIC_AUTH_PASS_CHROMIUM').required().asString(),
  REPORTER: {
    E2E: {
      PATH: E2E_PATH,
      OUTPUT_FILE_JSON: `${E2E_PATH}/${E2E_FILE_JSON}`,
      OUTPUT_FILE_JUNIT: `${E2E_PATH}/${E2E_FILE_JUNIT}`,
    },
    VISUAL: {
      PATH: VISUAL_PATH,
      OUTPUT_FILE_JSON: `${VISUAL_PATH}/${E2E_FILE_JSON}`,
      OUTPUT_FILE_JUNIT: `${VISUAL_PATH}/${E2E_FILE_JUNIT}`,
    },
  }
}