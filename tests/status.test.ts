import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { beforeAll } from '@jest/globals'
import ExpressInit from '../src/lib/express'
import { Express } from 'express-serve-static-core'

let app: Express

beforeAll(async () => {
  process.env.JWT_KEY = 'ddsadsa'
  console.log(process.env.NODE_ENV)
  app = await ExpressInit()
})

describe('Simple status test', () => {
  test('should return value', async () => {
    const res = await request(app).get('/alive')
    expect(res.status).toEqual(200)
  }, 5000)
})

describe('Not found test', () => {
  test('should return value', async () => {
    const res = await request(app).get('/routewhichneverwillexist')
    expect(res.status).toEqual(404)
  }, 5000)
})
