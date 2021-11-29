import mongoose from 'mongoose'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Provide email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Provide valid email',
    ],
    unique: [true, 'Email exists'],
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
  resetToken: {
    type: String,
  },
})
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.createJWT = async function () {
  const token = JWT.sign(
    {
      userID: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
  return token
}
UserSchema.methods.createResetToken = async function () {
  const salt = await bcrypt.genSalt(10)
  const token = crypto.randomBytes(32).toString('hex')
  this.resetToken = await bcrypt.hash(token, salt)
  return token
}
UserSchema.methods.compareToken = async function (candidateToken) {
  const match = await bcrypt.compare(candidateToken, this.resetToken)
  return match
}
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password)
  return match
}
export default mongoose.model('User', UserSchema)
