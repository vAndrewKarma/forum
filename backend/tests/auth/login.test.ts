import { beforeAll, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { User } from '../../src/models/user'
import { app, user } from '../setup'
beforeAll(async () => {
  const data = {
    email: `${user}@gmail.com`,
    password: 'ssszzsA37a!',
    firstName: 'dsaddzsadsa',
    confirm_password: 'ssszzsA37a!',
    lastName: 'dsaddsadsa',
    gender: 'Female',
    username: user,
    rememberMe: true,
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
      gender: 'Female',
      username: user,
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

describe('Simple login test, user not exists any more...', () => {
  test('should return 400 after login', async () => {
    const loginData = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsaddzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsaddsadsa',
      gender: 'Female',
      username: user,
      rememberMe: false,
    }

    const loginRes = await request(app).post('/login').send(loginData)
    expect(loginRes.status).toEqual(200)

    const cookie = loginRes.headers['set-cookie']
    await User.deleteOne({ username: user })
    const secondRequestRes = await request(app)
      .post('/check-auth')
      .set('Cookie', cookie)

    expect(secondRequestRes.body.data.loggedIn).toBe(false)
    expect(secondRequestRes.body.data.message).toBe(
      'User Successfully Logged Out'
    )

    const data = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
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
      rememberMe: false,
    }

    const loginRes = await request(app).post('/login').send(loginData)

    expect(loginRes.body.message).toBe('Verify your email')
    await User.deleteOne({ username: user })
    const data = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
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
