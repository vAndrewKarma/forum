import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app, user } from '../setup'

describe('Simple login test', () => {
  test('should return 200 after login', async () => {
    const res = await request(app)
      .post('/reset_password')
      .send({ email: `${user}@gmail.com` })
    expect(res.body.message).toBe('Email not found')
  })
})

describe('Simple login test', () => {
  test('should return 400 after login', async () => {
    const res = await request(app)
      .post('/reset_password')
      .send({ email: `${user}@1gmail.com` })
    expect(res.statusCode).toBe(400)
  })
})
