import 'dotenv/config';
import env from 'env-var'

export const CONSTS = {
  BASE_URL: env.get('HEROKU_BASE_URL').required().asString(),
}