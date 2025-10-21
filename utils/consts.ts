import 'dotenv/config';
import env from 'env-var'

export const CONSTS = {
  HEROKU_BASE_URL: env.get('HEROKU_BASE_URL').required().asString(),
  HEROKU_BASIC_AUTH_USER_GLOBAL: env.get('HEROKU_BASIC_AUTH_USER_GLOBAL').required().asString(),
  HEROKU_BASIC_AUTH_PASS_GLOBAL: env.get('HEROKU_BASIC_AUTH_PASS_GLOBAL').required().asString(),
  HEROKU_BASIC_AUTH_USER_CHROMIUM: env.get('HEROKU_BASIC_AUTH_USER_CHROMIUM').required().asString(),
  HEROKU_BASIC_AUTH_PASS_CHROMIUM: env.get('HEROKU_BASIC_AUTH_PASS_CHROMIUM').required().asString(),
}