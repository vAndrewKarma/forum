import config from '../config'
import transporter from '../config/nodemailer'
import genTokenForNewLocation from './tokens.service'

export const NewLocation = async (email: string, uid: string) => {
  const token = await genTokenForNewLocation(uid)
  console.log('problem3')
  const mailOptions = {
    from: config.app.email_user,
    to: email,
    subject: 'New location',
    text: `Seems like you moved to a new location. Please click the next link to confirm it: ${config.client}/new-location?=${uid}+${token}`,
  }

  // Send email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
    } else {
      console.log('Email sent:', info.response)
    }
  })
  console.log('problem4')
}
