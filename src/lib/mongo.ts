// import config from '../config'
import mongoose from 'mongoose'
import { connectionOptions } from '../config/mongo'
import { logger } from '../common/utils/logger'

mongoose.connect('mongodb://127.0.0.1:27017/forum-app', connectionOptions)
mongoose.connection.on('error', () => {
  logger.info(
    'MongoDB Connection Error. Please make sure that MongoDB is running.'
  )
  process.exit(1)
})
mongoose.connection.on('connected', function () {
  logger.info(`MongoDB: Connected to ${mongoose.connection.name}`)
})
// Handling SIGINTsignal
process.on('SIGINT', async function () {
  await mongoose.connection.close(true)
  logger.info(
    'Mongoose default connection disconnected through app termination'
  )
  process.exit(0)
})

// Handling SIGTERM signal
process.on('SIGTERM', async function () {
  await mongoose.connection.close(true)
  logger.info(
    'Mongoose default connection disconnected through app termination'
  )
  process.exit(0)
})

// Additional cleanup on unhandled rejections
process.on('unhandledRejection', async (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`)
  await mongoose.connection.close(true)
  logger.info(
    'Mongoose default connection disconnected through app termination'
  )
  process.exit(1)
})

// Additional cleanup on uncaught exceptions
process.on('uncaughtException', async (error) => {
  logger.error(`Uncaught Exception: ${error.message}`)
  await mongoose.connection.close(true)
  logger.info(
    'Mongoose default connection disconnected through app termination'
  )
  process.exit(1)
})

export { mongoose }
