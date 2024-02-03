import { logger } from '../common/utils/logger'
import config from '../config'
import transporter from '../config/nodemailer'
import { tokenServ } from './tokens.service'

type TEmailServ = {
  NewLocation: (email: string, uid: string) => Promise<void>
  NewPassword: (email: string, uid: string) => Promise<void>
  VerifyEmail: (email: string, uid: string) => Promise<void>
}
export const EmailServ: TEmailServ = {
  NewLocation: undefined,
  NewPassword: undefined,
  VerifyEmail: undefined,
}

EmailServ.NewLocation = async (email: string, uid: string) => {
  const token = await tokenServ.genTokenForNewLocation(uid)

  const mailOptions = {
    from: config.app.email_user,
    to: email,
    subject: 'New location',
    text: `Seems like you moved to a new location. Please click the next link to confirm it: ${config.client}/new-location/${uid}/${token}`,
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error)
    } else {
      logger.debug('Email sent:', info.response)
    }
  })
}

EmailServ.NewPassword = async (email: string, uid: string) => {
  const token = await tokenServ.genTokenForResetPassword(uid)

  const mailOptions = {
    from: config.app.email_user,
    to: email,
    subject: 'New Password',
    text: `Seems like you request a new password. Please click the next link to confirm it: ${config.client}/new-password/${uid}/${token}`,
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error)
    } else {
      logger.debug('Email sent:', info.response)
    }
  })
}

EmailServ.VerifyEmail = async (email: string, uid: string) => {
  const token = await tokenServ.genTokenForVerifyEmail(uid)

  const mailOptions = {
    from: config.app.email_user,
    to: email,
    subject: 'Verify your email',
    text: `Activate your account (email). Please click the next link to confirm it: ${config.client}/verify-email/${uid}/${token}`,
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error)
    } else {
      logger.debug('Email sent:', info.response)
    }
  })
}
