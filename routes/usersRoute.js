import express from 'express'
const router = express.Router()
import {
  forgotPassword,
  logIn,
  resetPassword,
  register,
} from '../controllers/user.js'
router.post('/register', register)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword', resetPassword)
router.post('/login', logIn)
export default router
