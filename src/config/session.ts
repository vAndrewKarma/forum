import Init_Store from '../lib/redis'
export default async function Get_Session_Details() {
  const store = await Init_Store()
  const session_config = {
    secret: 'f4z4gs$Gcg', // should be stored securely in a .env variable
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: true, // serve cookies on http (or in development mode)
      httpOnly: true, // clientside javascript(document.cookie) cannot see this cookie
    },
    rolling: true,
    saveUninitialized: true,
    resave: false,
    // eslint-disable-next-line no-constant-condition
  }
  if (store !== null && store.data.store && store.data.client) {
    session_config['store'] = store.data.store
  }
  return session_config
}
