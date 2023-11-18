import { beforeAll } from '@jest/globals'
import ExpressInit from '../src/lib/express'
import { Application } from 'express'

let app: Application

beforeAll(async () => {
  process.env.JWT_KEY = 'test_secret'
  app = await ExpressInit()
})
export { app }
