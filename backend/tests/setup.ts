import { beforeAll } from '@jest/globals'

import ExpressInit from '../src/lib/express'
import { Application } from 'express'
import mongoose from 'mongoose'
import config from '../src/config'
import * as redis from 'redis'
let app: Application

let client
beforeAll(async () => {
  app = await ExpressInit()
  await mongoose.connect(config.tests.db, {
    socketTimeoutMS: 15000, // close sockets after 45 seconds of inactivity
    family: 4, // use IPv4, skip trying IPv6
  })
  client = redis.createClient({
    url: config.tests.cache,
  })
  await client.connect().catch(console.error)
})

beforeAll(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})
export { app }
