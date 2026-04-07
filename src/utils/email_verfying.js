import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendVerificationEmail = async ({ to, subject = 'Verify your email', text, html }) => {
  if (!to) throw new Error('Missing recipient email')
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  const mail = await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.GMAIL_USER,
    to,
    subject,
    text,
    html,
  })

  return mail
}

