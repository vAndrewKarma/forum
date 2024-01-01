import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app, user } from '../setup'

let cookie
let csrf
describe('Simple register test', () => {
  test('should return 200', async () => {
    const token = await request(app).get('/about_me')
    csrf = token.body.data.csrf
    const data = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: user,
      csrf: csrf,
    }
    const res = await request(app).post('/register').send(data)
    expect(res.body.data.loggedIn).toBe(true)
    cookie = res.headers['set-cookie']

    const secondRequestRes = await request(app)
      .post('/check-auth')
      .set('Cookie', cookie)
    expect(secondRequestRes.body.data.loggedIn).toBe(true)
  })
})

describe('Simple register test', () => {
  test('should return 200', async () => {
    await request(app)
      .post('/register')
      .send({
        email: `${user}@gmail.com`,
        password: 'ssszzsA37a!',
        firstName: 'dsadzsadsa',
        confirm_password: 'ssszzsA37a!',
        lastName: 'dsadsadsa',
        gender: 'Female',
        username: 'kzzdddddddzzzz',
        csrf: csrf,
      })

    const res = await request(app)
      .post('/register')
      .send({
        email: `${user}@gmail.com`,
        password: 'ssszzsA37a!',
        firstName: 'dsadzsadsa',
        confirm_password: 'ssszzsA37a!',
        lastName: 'dsadsadsa',
        gender: 'Female',
        username: 'kzzdd1ddddzzzzzzzzdzzzz',
        csrf: csrf,
      })
      .set('Cookie', cookie)

    expect(res.body.data.loggedIn).toBe(true)
    expect(res.body.data.message).toBe('User already loggedIn')
  })
})

describe('Simple  check passwords register test', () => {
  test('should return 411', async () => {
    const data = {
      email: `${user}@gmail.com`,
      password: 'ssszzsA37a!',
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsddA37a!',
      csrf: csrf,
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: user,
    }
    const res = await request(app).post('/register').send(data)
    expect(res.status).toEqual(411)
  })
})

describe('Simple password register test', () => {
  test('should return 411', async () => {
    const data = {
      email: 'kdaadddzd6ail@gmail.com',
      firstName: 'dsadzsadsa',
      csrf: csrf,
      confirm_password: 'ssszzsddA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: 'kzzdddddddzzzz',
    }
    const res = await request(app).post('/register').send(data)
    expect(res.status).toEqual(411)
  })
})

describe('Simple username register test', () => {
  test('should return 411', async () => {
    const data = {
      email: 'kdaadddzd6ail@gmail.com',
      csrf: csrf,
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsddA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: 'kzz!dddddddzzzz',
    }
    const res = await request(app).post('/register').send(data)
    expect(res.status).toEqual(411)
  })
})

describe('Simple register duplicate username test', () => {
  test('should return 400', async () => {
    await request(app).post('/register').send({
      email: 'kdaaddddzd6ail@gmail.com',
      password: 'ssszzsA37a!',
      csrf: csrf,
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: user,
    })

    const res = await request(app).post('/register').send({
      email: 'dsadsadsa@gmail.com',
      password: 'ssszzsA37a!',
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsA37a!',
      csrf: csrf,
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: user,
    })
    expect(res.status).toEqual(400)
  })
})

describe('Simple register duplicate email test', () => {
  test('should return 400', async () => {
    await request(app)
      .post('/register')
      .send({
        email: `${user}@gmail.com`,
        password: 'ssszzsA37a!',
        firstName: 'dsadzsadsa',
        confirm_password: 'ssszzsA37a!',
        csrf: csrf,
        lastName: 'dsadsadsa',
        gender: 'Female',
        username: 'ddddzzzzz',
      })

    const res = await request(app)
      .post('/register')
      .send({
        email: `${user}@gmail.com`,
        password: 'ssszzsA37a!',
        firstName: 'dsadzsadsa',
        confirm_password: 'ssszzsA37a!',
        csrf: csrf,
        lastName: 'dsadsadsa',
        gender: 'Female',
        username: 'ddddzzzzzzzx',
      })
    expect(res.status).toEqual(400)
  })
})
