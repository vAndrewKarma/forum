import { afterAll, beforeAll } from '@jest/globals'
import ExpressInit from '../src/lib/express'
import { Application } from 'express'
import mongoose from 'mongoose'
import config from '../src/config'
import * as redis from 'redis'
import { logger } from '../src/common/utils/logger'
let app: Application

let client
const user = Math.random().toString(36).slice(2, 13)
async function clearAllCollections() {
  try {
    // Get all model names registered with Mongoose
    const modelNames = mongoose.modelNames()

    // Clear collections for each model
    await Promise.all(
      modelNames.map(async (modelName) => {
        const Model = mongoose.model(modelName)
        await Model.deleteMany({})
      })
    )

    console.log('All collections cleared successfully.')
  } catch (error) {
    console.error('Error clearing collections:', error)
  } finally {
    // Close the mongoose connection after clearing collections
    mongoose.connection.close()
  }
}
beforeAll(async () => {
  app = await ExpressInit()
  await mongoose.connect(config.tests.db, {
    socketTimeoutMS: 15000,
    family: 4,
  })
  await clearAllCollections()
  client = redis.createClient({
    url: config.tests.cache,
  })
  await client.connect().catch(logger.error)
})
afterAll(async () => {
  await mongoose.disconnect()

  await client.quit()
})
export { app, user }
