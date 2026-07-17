import sgMail, { MailDataRequired } from "@sendgrid/mail";
import ResponseError from "@sendgrid/helpers/classes/response-error";
import { SENDGRID } from "../utils/env/sendgrid.env";
sgMail.setApiKey(SENDGRID.API_KEY);

export interface IMessageSendgrid {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string; //html
}

interface ISendgridError extends Error {
  code?: number;
  response?: {
    body?: {
      error?: {
        message?: string;
        field?: string | null;
        help?: string | null;
      }[];
    };
  };
}

export async function sendEmailViaSendgrid(message: IMessageSendgrid) {
  try {
    await sgMail.send(message as MailDataRequired | MailDataRequired[]);
    console.log("Email Sent");
  } catch (error) {
    if (error instanceof ResponseError) {
      console.log(
        `SENDGRID RESPONSE: ${JSON.stringify(
          {
            message: error.message,
            code: error.code,
            body: error.response.body
          }
          , null, 2)}`,
      );
    }
  }
}
