import dotenv from 'dotenv'
dotenv.config()
export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  app: {
    port: process.env.PORT || 4000,
    jwt: process.env.JWT_SECRET || 'test',
  },
  db: process.env.MONGO_URI || 'mongodb://localhost:27017/forum',
  client: process.env.client || 'http://localhost:3000',
}
