import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'

describe('Simple login test', () => {
  test('should return 200', async () => {
    const data = {
      password: 'ssszzsA37a!',
      username: 'kzzddddddddzzzz',
      rememberMe: true,
    }
    const res = await request(app).post('/login').send(data)
    expect(res.status).toEqual(200)
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
