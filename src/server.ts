import 'reflect-metadata'
import express from 'express'
import './database'
import { router } from './routes'
require('dotenv').config()

const app = express()
const port = process.env.APP_PORT || 3001

app.use(express.json())
app.use(router)

app.listen(port, () => console.log(`Server is running at https://localhost:${port}`))