import { beforeAll } from '@jest/globals'
import request from 'supertest'
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

  const data = {
    email: 'kdaaddddzd6ail@gmail.com',
    password: 'ssszzsA37a!',
    firstName: 'dsaddzsadsa',
    confirm_password: 'ssszzsA37a!',
    lastName: 'dsaddsadsa',
    gender: 'Female',
    username: 'kzzddddddddzzzz',
  }
  await request(app).post('/register').send(data)
  await client.connect().catch(console.error)
  await client.disconnect()
})

export { app }
