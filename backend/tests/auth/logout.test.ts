import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../setup'

describe('Simple logout test ', () => {
  test('should return 200', async () => {
    const res = await request(app).post('/logout')
    expect(res.status).toEqual(200)
  })
})
