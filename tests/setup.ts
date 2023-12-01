import { afterAll, beforeAll, beforeEach } from '@jest/globals'
import ExpressInit from '../src/lib/express'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Application } from 'express'
import request from 'supertest'
import mongoose from 'mongoose'
let app: Application
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mongo: any

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()
  app = await ExpressInit()
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000, // timeout after 5 seconds of inactivity during server selection
    socketTimeoutMS: 45000, // close sockets after 45 seconds of inactivity
    family: 4, // use IPv4, skip trying IPv6
  })
})
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }

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
})
afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})
export { app }
