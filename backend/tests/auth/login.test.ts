import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'

describe('Simple login test', () => {
  test('should return 200 after login', async () => {
    const loginData = {
      email: 'kdaaddddzd6ail@gmail.com',
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      gender: 'Female',
      username: 'kzzddddddddzzzz',
      rememberMe: true,
    }

    const loginRes = await request(app).post('/login').send(loginData)
    expect(loginRes.status).toEqual(200)

    const cookie = loginRes.headers['set-cookie']

    const secondRequestRes = await request(app)
      .post('/check-auth')
      .set('Cookie', cookie)

    expect(secondRequestRes.body.data.loggedIn).toBe(true)

    expect(secondRequestRes.body.data.message).toBe('User logged in')
  })
})
