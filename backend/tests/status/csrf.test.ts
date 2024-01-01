import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'

describe('Simple csrf test', () => {
  test('should return value', async () => {
    const res = await request(app).post('/register')
    expect(res.status).toEqual(409)
  })
})
