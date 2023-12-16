import Init_Store from './store'
async function client_init() {
  const store = await Init_Store()
  return store.data.client
}

const client = client_init()
export default client
