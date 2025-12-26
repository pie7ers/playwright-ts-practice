import 'dotenv/config';
import env from 'env-var';

export const SENDGRID = {
    API_KEY: env.get('SENDGRID_API_KEY_TEST').required().asString(),
    EMAIL_TO: env.get('SENDGRID_EMAIL_TO').required().asString(),
    EMAIL_FROM: env.get('SENDGRID_EMAIL_FROM').required().asString(),
}