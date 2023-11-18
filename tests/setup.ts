import { beforeAll } from '@jest/globals'
import ExpressInit from '../src/lib/express'
import { Express } from 'express-serve-static-core'

let app: Express

beforeAll(async () => {
  process.env.JWT_KEY = 'test_secret'
  app = await ExpressInit()
})
export { app }
