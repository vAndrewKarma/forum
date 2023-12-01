import RedisStore from 'connect-redis'
import { createClient } from 'redis'
import { logger } from '../config/logger'
import config from '../config'

export default async function Init_Store() {
  let client = null
  // eslint-disable-next-line no-constant-condition
  if (config.NODE_ENV === 'development' || config.NODE_ENV === 'production') {
    client = createClient({
      url: config.cache,
    })
    client
      .on('error', (err) => {
        logger.error(`Redis connection error: ${err}`)
      })
      .on('connect', () => {
        logger.info('Connected to Redis')
      })
    await client.connect().catch(logger.error)
  }

  if (client != null) {
    return {
      data: {
        store: new RedisStore({
          client: client,
          ttl: 24 * 60 * 60,
        }),
        client,
      },
    }
  }
  return null
}
