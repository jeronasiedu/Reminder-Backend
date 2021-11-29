import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import usersRoute from './routes/usersRoute.js'
import remindersRouter from './routes/remindersRoute.js'
import handleError from './middleware/handleError.js'
import notFound from './middleware/notFound.js'
import auth from './middleware/auth.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
// middleWares
app.use(express.json())
app.use(cors())
app.use('/user', usersRoute)
app.use('/reminder', auth, remindersRouter)
app.use(notFound)
app.use(handleError)
app.get('/', (req, res) => {
  res.send('We are in')
})
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is blazing on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}
start()
