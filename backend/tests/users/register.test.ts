import { afterAll, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'
import mongoose from 'mongoose'
afterAll(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})
let cookie
describe('Simple register test', () => {
  test('should return 200', async () => {
    const data = {
      email: 'kdaaddzdzd6ail@gmail.com',
      password: 'ssszzsA37a!',
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: 'kzzddzdddddzzzz',
    }
    const res = await request(app).post('/register').send(data)
    expect(res.status).toEqual(200)
    cookie = res.headers['set-cookie']

    const secondRequestRes = await request(app)
      .post('/check-auth')
      .set('Cookie', cookie)
    expect(secondRequestRes.body.data.loggedIn).toBe(true)
  })
})

describe('Simple register test', () => {
  test('should return 200', async () => {
    await request(app).post('/register').send({
      email: 'kdaadddzd6ail@gmail.com',
      password: 'ssszzsA37a!',
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: 'kzzdddddddzzzz',
    })

    const res = await request(app)
      .post('/register')
      .send({
        email: 'kdaadddzzzzz1zd6ail@gmail.com',
        password: 'ssszzsA37a!',
        firstName: 'dsadzsadsa',
        confirm_password: 'ssszzsA37a!',
        lastName: 'dsadsadsa',
        gender: 'Female',
        username: 'kzzdd1ddddzzzzzzzzdzzzz',
      })
      .set('Cookie', cookie)

    expect(res.body.data.loggedIn).toBe(true)
    expect(res.body.data.message).toBe('User already loggedIn')
  })
})

describe('Simple  check passwords register test', () => {
  test('should return 411', async () => {
    const data = {
      email: 'kdaadddzd6ail@gmail.com',
      password: 'ssszzsA37a!',
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsddA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: 'kzzdddddddzzzz',
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
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: 'kzzddddddddzzzz',
    })

    const res = await request(app).post('/register').send({
      email: 'dsadsadsa@gmail.com',
      password: 'ssszzsA37a!',
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: 'kzzddddddddzzzz',
    })
    expect(res.status).toEqual(400)
  })
})

describe('Simple register duplicate email test', () => {
  test('should return 400', async () => {
    await request(app).post('/register').send({
      email: 'dsadsadsa@gmail.com',
      password: 'ssszzsA37a!',
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: 'ddddzzzzz',
    })

    const res = await request(app).post('/register').send({
      email: 'dsadsadsa@gmail.com',
      password: 'ssszzsA37a!',
      firstName: 'dsadzsadsa',
      confirm_password: 'ssszzsA37a!',
      lastName: 'dsadsadsa',
      gender: 'Female',
      username: 'ddddzzzzzzzx',
    })
    expect(res.status).toEqual(400)
  })
})
