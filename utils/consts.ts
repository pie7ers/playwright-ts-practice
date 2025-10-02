import 'dotenv/config';
import env from 'env-var'

export const CONSTS = {
  BASE_URL: env.get('HEROKU_BASE_URL').required().asString(),
  BASIC_AUTH_USER_GLOBAL: env.get('BASIC_AUTH_USER_GLOBAL').required().asString(),
  BASIC_AUTH_PASS_GLOBAL: env.get('BASIC_AUTH_PASS_GLOBAL').required().asString(),
  BASIC_AUTH_USER_CHROMIUM: env.get('BASIC_AUTH_USER_CHROMIUM').required().asString(),
  BASIC_AUTH_PASS_CHROMIUM: env.get('BASIC_AUTH_PASS_CHROMIUM').required().asString(),
}