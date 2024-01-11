import config from '.'
import Init_Store from '../lib/store'
export default async function Get_Session_Details() {
  const store = await Init_Store()
  const isProduction = config.NODE_ENV === 'production'

  const session_config = {
    secret: config.app.session, // should be stored securely in a .env variable
    cookie: {
      sameSite: true,
      maxAge: 10800000, // 3 hours
      secure: isProduction, // serve cookies on http (or in development mode)
      httpOnly: true, // clientside javascript(document.cookie) cannot see this cookie
    },
    proxy: isProduction,
    rolling: true,
    saveUninitialized: false,
    resave: false,
    key: 'user_sid',
  }
  if (store !== null && store.data.store && store.data.client) {
    session_config['store'] = store.data.store
  }

  return { sconfig: session_config, client: store.data.client || null }
}
