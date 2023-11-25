import RedisStore from 'connect-redis'
import { createClient } from 'redis'
import { logger } from '../common/utils/logger'
import config from '../config'
export const client = createClient({
  url: config.cache,
})
client
  .on('error', (err) => {
    logger.error(`Redis connection error: ${err}`)
  })
  .on('connect', () => {
    logger.info('Connected to Redis')
  })

client.connect().catch(logger.error)

export const redisStore = new RedisStore({
  client,
  ttl: 24 * 60 * 60,
})
