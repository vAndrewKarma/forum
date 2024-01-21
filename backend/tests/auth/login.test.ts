import { beforeAll, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { User } from '../../src/models/user'
import { app, user } from '../setup'
let csrf
beforeAll(async () => {
  const token = await request(app).get('/about_me')
  csrf = token.body.csrf
  const data = {
    email: `${user}@gmail.com`,
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
})
describe('Simple login test', () => {
  test('should return 200 after login', async () => {
    const loginData = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      csrf: csrf,
      gender: 'Female',
      username: user,
      rememberMe: true,
    }

    const loginRes = await request(app).post('/login').send(loginData)
    expect(loginRes.status).toEqual(200)

    const cookie = loginRes.headers['set-cookie']

    const secondRequestRes = await request(app)
      .get('/about_me')
      .set('Cookie', cookie)

    expect(secondRequestRes.body.loggedIn).toBe(true)

    expect(secondRequestRes.body.message).toBe('User loggedIn')
  })
})

describe('Simple login test', () => {
  test('should return 200 after login', async () => {
    const loginData = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      gender: 'Female',
      username: user,
      rememberMe: false,
      csrf: csrf,
    }

    const loginRes = await request(app).post('/login').send(loginData)
    expect(loginRes.status).toEqual(200)

    const cookie = loginRes.headers['set-cookie']

    const secondRequestRes = await request(app)
      .get('/about_me')
      .set('Cookie', cookie)

    expect(secondRequestRes.body.loggedIn).toBe(true)

    expect(secondRequestRes.body.message).toBe('User loggedIn')
  })
})

describe('Simple login test, user not exists any more...', () => {
  test('should return 400 after login', async () => {
    const loginData = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      csrf: csrf,
      gender: 'Female',
      username: user,
      rememberMe: false,
    }

    const loginRes = await request(app).post('/login').send(loginData)
    expect(loginRes.status).toEqual(200)

    const cookie = loginRes.headers['set-cookie']
    await User.deleteOne({ username: user })
    await request(app)
      .get('/about_me')
      .set('Cookie', cookie)


    const data = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      csrf: csrf,
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      gender: 'Female',
      username: user,
      rememberMe: true,
    }
    await request(app).post('/register').send(data)
  })
})

describe('Simple login test', () => {
  test('should return 200 after login', async () => {
    await User.updateOne({ username: user }, { $set: { ip: [] } })
    const loginData = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      gender: 'Female',
      username: user,
      csrf: csrf,
      rememberMe: false,
    }

    const loginRes = await request(app).post('/login').send(loginData)

    expect(loginRes.body.message).toBe('New location detected. Verify your email')
    await User.deleteOne({ username: user })
    const data = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
      csrf: csrf,
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      gender: 'Female',
      username: user,
      rememberMe: true,
    }
    await request(app).post('/register').send(data)
  })
})
