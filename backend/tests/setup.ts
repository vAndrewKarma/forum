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

beforeAll(async () => {
  app = await ExpressInit()
  await mongoose.connect(config.tests.db, {
    socketTimeoutMS: 15000,
    family: 4,
  })
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
