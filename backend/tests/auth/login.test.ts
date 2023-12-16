import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'

describe('Simple login test', () => {
  test('should return 200 after login', async () => {
    const loginData = {
      password: 'ssszzsA37a!',
      username: 'kzzddddddddzzzz',
      rememberMe: true,
    }

    // Make a request to /login and store the cookie
    const loginRes = await request(app).post('/login').send(loginData)
    expect(loginRes.status).toEqual(200)

    // Extract the cookie from the response headers
    const cookie = loginRes.headers['set-cookie'][0]

    // Make a second request with the obtained cookie
    const secondRequestRes = await request(app)
      .get('/check-auth') // Replace with the endpoint you want to test
      .set('Cookie', cookie) // Include the cookie in the headers

    // Assert the response of the second request
    expect(secondRequestRes.status).toEqual(201)
    // Add more assertions based on the expected response
  })
})

describe('Simple login test username fails', () => {
  test('should return 400', async () => {
    const data = {
      password: 'ssszzsA37a!',
      username: 'kzzddddzzzzddddzzzz',
      rememberMe: true,
    }
    const res = await request(app).post('/login').send(data)
    expect(res.status).toEqual(400)
  })
})

describe('Simple login test password fails', () => {
  test('should return 400', async () => {
    const data = {
      password: 'ssszzsAaaaa37a!',
      username: 'kzzddddddddzzzz',
      rememberMe: true,
    }
    const res = await request(app).post('/login').send(data)
    expect(res.status).toEqual(400)
  })
})

describe('Simple login test for validation', () => {
  test('should return 411', async () => {
    const data = {
      password: 'ssszzsAaaaa37a!',
    }
    const res = await request(app).post('/login').send(data)
    expect(res.status).toEqual(411)
  })
})
