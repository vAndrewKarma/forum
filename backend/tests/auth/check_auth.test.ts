import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'

describe('Simple login test', () => {
  test('should return 400 after login', async () => {
    const res = await request(app).post('/check-auth')
    expect(res.body.data.message).toBe('User not loggedIn')
  })
})

describe('Simple login test', () => {
  test('should return false for loggedIn in about_me request', async () => {
    const res = await request(app).get('/about_me')
    expect(res.body.loggedIn).toBe(false)
    expect(res.body.csrf).not.toBeNull()
  })
})
