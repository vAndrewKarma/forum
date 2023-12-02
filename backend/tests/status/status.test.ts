import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'

describe('Simple status test', () => {
  test('should return value', async () => {
    const res = await request(app).get('/_alivez')
    expect(res.status).toEqual(200)
  })
})

describe('Not found test', () => {
  test('should return value', async () => {
    const res = await request(app).get('/routewhichneverwillexist')
    expect(res.status).toEqual(404)
  })
})

describe('Metrics test', () => {
  test('should return value', async () => {
    const res = await request(app).get('/_metricz')
    expect(res.status).toEqual(200)
  })
})
