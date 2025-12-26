import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { SENDGRID } from '../utils/env/sendgrid.env'
sgMail.setApiKey(SENDGRID.API_KEY)


export interface IMessageSendgrid {
  to: string
  from: string
  subject: string
  text?: string
  html?: string //html
}

export async function sendEmailViaSendgrid(message: IMessageSendgrid) {
  try {
    await sgMail.send(message as MailDataRequired | MailDataRequired[])
    console.log('Email Sent')
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      console.error(error.message)
    }
  }
}