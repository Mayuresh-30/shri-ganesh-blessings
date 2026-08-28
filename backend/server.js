import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mysql from 'mysql2/promise'
import { createBappaResponse } from './responseGenerator.js'

const app = express()
const port = process.env.PORT || 3000

const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 5,
})

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.json({ limit: '10kb' }))

app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}))

app.post('/api/blessings', async (request, response) => {
  try {
    const { userName, userWish, ganeshName } = request.body

    if (
      typeof userName !== 'string' ||
      typeof userWish !== 'string' ||
      !userName.trim() ||
      !userWish.trim()
    ) {
      return response.status(400).json({
        error: 'Name and wish are required.',
      })
    }

    const cleanName = userName.trim().slice(0, 80)
    const cleanWish = userWish.trim().slice(0, 500)
    const cleanGaneshName = ganeshName || 'Ganapati'
    const bappaResponse = createBappaResponse(cleanWish)

    await database.execute(
      `INSERT INTO blessings
       (user_name, user_wish, bappa_response, ganesh_name)
       VALUES (?, ?, ?, ?)`,
      [cleanName, cleanWish, bappaResponse, cleanGaneshName],
    )

    return response.status(201).json({
      message: bappaResponse,
    })
  } catch (error) {
    console.error(error)

    return response.status(500).json({
      error: 'Unable to save blessing.',
    })
  }
})

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})
