import nodemailer from 'nodemailer'
import customError from '../errors/customError.js'
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com', // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: 'norejudeisa@outlook.com',
    pass: 'Udeisa@0000',
  },
})

const sendMail = (to, link) => {
  const mailOptions = {
    from: process.env.EMAIL, // sender address
    to: to, // list of receivers
    subject: 'Reset Password', // Subject line
    html: `<h4>You have requested to reset your password, ignore this message if it wasn't you</h4>
    <p>Please click on the link to reset your password</p>
      <a href=${link}></a>
      `, // plain text body
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err.message)
      throw new customError(
        'There was an error generating reset link, check your connection'
      )
    } else {
      console.log(info.response)
      return info.response
    }
  })
}
export default sendMail
