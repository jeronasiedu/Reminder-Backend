import User from '../db/models/User.js'
import handler from 'express-async-handler'
import customError from '../errors/customError.js'
import sendMail from '../utils/sendMail.js'
import Type from '../db/models/Type.js'
// register route
const register = handler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    throw new customError('Please provide username, password and email', 400)
  }
  const user = await User.create(req.body)
  const typeObj = { name: 'all', createdBy: user._id }
  const type = await Type.create(typeObj)
  const token = await user.createJWT()
  return res.status(201).json({
    token,
  })
})
// login route
const logIn = handler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new customError('Please provide email and password', 400)
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new customError('Invalid credentials', 400)
  }
  const validUser = await user.comparePassword(password)
  if (!validUser) {
    throw new customError('Email and Password do not match', 400)
  }
  const token = await user.createJWT()
  res.status(201).json({
    token,
  })
})
// forgot password
const forgotPassword = handler(async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new customError('Please Provide email', 400)
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new customError('Invalid credentials', 400)
  }
  const resetToken = await user.createResetToken()
  await user.save()
  let resetLink = `${process.env.CLIENT_URL}/resetpassword?token=${resetToken}&id=${user._id}`
  //  NODE MAILER GOES HERE
  sendMail(email, resetLink)

  return res.status(200).json({
    msg: 'Email sent, follow link to reset your password',
    resetLink,
  })
})
// reset password
const resetPassword = handler(async (req, res) => {
  const { token, password, id } = req.body
  if (!token) {
    throw new customError('Invalid or expired password token', 400)
  }
  if (!password) {
    throw new customError('New password required', 400)
  }
  const newPassword = password
  const user = await User.findById(id)
  if (!user) {
    throw new customError('No user found with this reset link', 400)
  }
  const isValid = await user.compareToken(token)
  if (!isValid) {
    throw new customError('Password link has expired')
  }
  user.password = newPassword
  user.resetToken = ''
  await user.save()
  return res.status(200).json({ msg: 'Password reset successfully' })
})
export { resetPassword, forgotPassword, register, logIn }
