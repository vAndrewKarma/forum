import { beforeAll } from '@jest/globals'
import ExpressInit from '../src/lib/express'
import { Application } from 'express'

let app: Application

beforeAll(async () => {
  app = await ExpressInit()
})
export { app }
