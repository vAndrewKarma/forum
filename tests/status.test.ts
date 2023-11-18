import { beforeAll, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import ExpressInit from '../src/lib/express'
import { Express } from 'express-serve-static-core'

let app: Express

beforeAll(async () => {
  app = await ExpressInit()
})

describe('Simple status test', () => {
  test('return value', async () => {
    const res = await request(app).get('/alive')
    expect(res.status).toEqual(200)
  }, 5000)
})
