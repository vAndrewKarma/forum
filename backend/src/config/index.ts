import dotenv from 'dotenv'
dotenv.config()
export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  app: {
    port: process.env.PORT || 4000,
    session: process.env.SESSION_SECRET || 'tests',
    email_user: process.env.EMAIL_USER || '',
    password_user: process.env.PASSWORD_USER || '',
    service: process.env.MAIL_SERVICE || '',
    mail_port: process.env.MAIL_PORT || 587,
  },
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/forum',
  client: process.env.CLIENT || 'http://localhost:5173',
  cache: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  tests: {
    cache: process.env.TESTS_CACHE_URL || '',
    db: process.env.DB_URI_TESTS || '',
  },
}
