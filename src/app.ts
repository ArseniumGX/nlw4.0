import 'reflect-metadata'
import express from 'express'
import createConnection from './database'
import { router } from './routes'
require('dotenv').config()

createConnection()

const app = express()
const port = process.env.APP_PORT || 3001

app.use(express.json())
app.use(router)

export { app, port }