import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'

describe('Simple status test', () => {
  test('should return value', async () => {
    const res = await (request(app) as any).get('/alive')
    expect(res.status).toEqual(200)
  }, 5000)
})

describe('Not found test', () => {
  test('should return value', async () => {
    const res = await (request(app) as any).get('/routewhichneverwillexist')
    expect(res.status).toEqual(404)
  }, 5000)
})
