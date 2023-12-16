import nodemailer from 'nodemailer'
import config from '.'

const transporter = nodemailer.createTransport({
  host: config.app.service,
  port: config.app.mail_port,
  auth: {
    user: config.app.email_user,
    pass: config.app.password_user,
  },
})
export default transporter
