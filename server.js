import express from 'express'
import controllers from './controllers'
import db from './models'
import session from 'express-session'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(session({
  secret: 'gogocat',
  resave: false,
  saveUninitialized: true
}))

// Routing
app.use('/', controllers.website)
app.use('/platform', controllers.platform)

app.on('close', () => db.disconnect())
app.listen(process.env.PORT)

console.log("Listening on port 3000")

export default app
