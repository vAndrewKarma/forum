import { redisStore } from '../lib/redis'
import config from '.'

export const session_config = {
  store: redisStore,
  secret: 'f4z4gs$Gcg', //should be storred securelly in a .env variable

  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: config.NODE_ENV === 'production', // serve cookies on http (or in development mode)
    httpOnly: true, // clientside javascript(document.cookie) cannot see this cookie
  },
  rolling: true,
  saveUninitialized: true,
  resave: false,
}
