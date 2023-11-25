import dotenv from 'dotenv'
dotenv.config()
export default {
  NODE_ENV: process.env.NODE_ENV || 'tests',
  app: {
    port: process.env.PORT || 4000,
    jwt: process.env.JWT_SECRET || 'test',
  },
  db: process.env.MONGO_URI || 'mongodb://localhost:27017/forum',
  client: process.env.CLIENT || 'http://localhost:3000',
  cache: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
}
