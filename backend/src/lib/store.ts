import RedisStore from 'connect-redis'
import { createClient } from 'redis'
import { logger } from '../common/utils/logger'
import config from '../config'

export default async function Init_Store() {
  logger.debug(config.NODE_ENV === 'tests' ? config.tests.cache : config.cache)

  const client = createClient({
    url: config.NODE_ENV === 'tests' ? config.tests.cache : config.cache,
  })

  client
    .on('error', (err) => {
      logger.error(`Redis connection error: ${err}`)
    })
    .on('connect', () => {
      logger.info('Connected to Redis')
    })
  await client.connect().catch(logger.error)

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
