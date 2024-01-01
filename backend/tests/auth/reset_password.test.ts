import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app, user } from '../setup'
let csrf
describe('Simple login test', () => {
  test('should return 200 after login', async () => {
    const token = await request(app).get('/about_me')
    csrf = token.body.data.csrf
    const data = {
      email: `${user}1@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      gender: 'Female',
      username: user,
      rememberMe: true,
      csrf: csrf,
    }
    await request(app).post('/register').send(data)
    const res = await request(app)
      .post('/reset_password')
      .send({ email: `${user}1@gmail.com` })
    expect(res.body.message).toBe('Verify your email')
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

describe('Simple login test', () => {
  test('should return 400 after login', async () => {
    const res = await request(app)
      .post('/check_link_password_reset')
      .send({ email: `${user}@1gmail.com` })
    expect(res.statusCode).toBe(411)
  })
})

describe('Simple login test', () => {
  test('should return 400 after login', async () => {
    const res = await request(app)
      .post('/new_password')
      .send({ email: `${user}@1gmail.com` })
    expect(res.statusCode).toBe(411)
  })
})

describe('Simple login test', () => {
  test('should return 400 after login', async () => {
    const data = {
      email: `${user}1@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      gender: 'Female',
      username: user,
      rememberMe: true,

      uid: '6589798556878599795d91e3',
      token: 'a8adec0c0a1916a7db5e45417766aad0e21dced5',
    }
    const res = await request(app).post('/check_link_password_reset').send(data)
    expect(res.statusCode).toBe(400)
  })
})

describe('Simple login test', () => {
  test('should return 400 after login', async () => {
    const data = {
      email: `${user}1@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      gender: 'Female',
      username: user,
      rememberMe: true,

      uid: '6589798556878599795d91e3',
      token: 'a8adec0c0a1916a7db5e45417766aad0e21dced5',
    }
    const res = await request(app).post('/new_password').send(data)
    expect(res.statusCode).toBe(400)
  })
})
