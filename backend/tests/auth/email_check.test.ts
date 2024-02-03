import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'

describe('Simple login test', () => {
  test('should return 400 after login', async () => {
    const data = {
      uid: '6588bb4ddf481966511d0eec',
      token: '99e29e65f871aad3d4dd06cc8894807750b5c62a',
    }

    const res = await request(app).post('/activate_email').send(data)
    expect(res.body.message).toBe('Invalid link')
  })
})

describe('Simple login test', () => {
  test('should return 400 after login', async () => {
    const res = await request(app).post('/activate_email_request')
    expect(res.body.message).toBe('User not loggedIn')
  })
})
