import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mysql from 'mysql2/promise'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createBappaResponse } from './responseGenerator.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
dotenv.config({ path: resolve(projectRoot, '.env') })

const app = express()
const port = process.env.PORT || 3000
const requiredDatabaseEnvironment = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME']
const missingDatabaseEnvironment = requiredDatabaseEnvironment.filter((key) => !process.env[key])

if (missingDatabaseEnvironment.length > 0) {
  throw new Error(`Missing database environment variables: ${missingDatabaseEnvironment.join(', ')}`)
}

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

function isUuid(value) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function blessingPayload(blessing) {
  return {
    userId: blessing.user_id,
    name: blessing.user_name,
    wish: blessing.user_wish,
    ganeshImageId: blessing.ganesh_name,
    bappaResponse: blessing.bappa_response,
  }
}

app.post('/api/blessings', async (request, response) => {
  let connection

  try {
    const { userId, userName, userWish, ganeshName } = request.body

    if (
      !isUuid(userId) ||
      typeof userName !== 'string' ||
      typeof userWish !== 'string' ||
      !userName.trim() ||
      !userWish.trim()
    ) {
      return response.status(400).json({
        error: 'A valid user ID, name, and wish are required.',
      })
    }

    const cleanName = userName.trim().slice(0, 80)
    const cleanWish = userWish.trim().slice(0, 500)
    const cleanGaneshName = ganeshName || 'Ganapati'
    connection = await database.getConnection()
    await connection.beginTransaction()

    const [existingBlessings] = await connection.execute(
      `SELECT user_id, user_name, user_wish, bappa_response, ganesh_name
       FROM blessings
       WHERE user_id = ?
       LIMIT 1
       FOR UPDATE`,
      [userId],
    )

    if (existingBlessings.length > 0) {
      await connection.rollback()

      return response.status(409).json({
        code: 'ALREADY_BLESSED',
        error: 'This user has already received a blessing.',
        blessing: blessingPayload(existingBlessings[0]),
      })
    }

    const bappaResponse = createBappaResponse(cleanWish)

    await connection.execute(
      `INSERT INTO blessings
       (user_id, user_name, user_wish, bappa_response, ganesh_name)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, cleanName, cleanWish, bappaResponse, cleanGaneshName],
    )

    await connection.commit()

    return response.status(201).json({
      message: bappaResponse,
      userId,
      replayed: false,
    })
  } catch (error) {
    if (connection) {
      await connection.rollback()
    }

    if (error.code === 'ER_DUP_ENTRY') {
      try {
        const [existingBlessings] = await database.execute(
          `SELECT user_id, user_name, user_wish, bappa_response, ganesh_name
           FROM blessings
           WHERE user_id = ?
           LIMIT 1`,
          [request.body.userId],
        )

        if (existingBlessings.length > 0) {
          return response.status(409).json({
            code: 'ALREADY_BLESSED',
            error: 'This user has already received a blessing.',
            blessing: blessingPayload(existingBlessings[0]),
          })
        }
      } catch (lookupError) {
        console.error(lookupError)
      }
    }

    console.error(error)

    return response.status(500).json({
      error: 'Unable to save blessing.',
    })
  } finally {
    connection?.release()
  }
})

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})
