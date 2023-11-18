import config from './config'
import process from 'node:process'
import ExpressInit from './lib/express'
import { logger } from './config/logger'
;(async () => {
  const app = await ExpressInit()
  if (require.main === module) {
    app
      .listen(config.app.port, () => {
        logger.info(`Listening to ${config.app.port} - ENV: ${config.NODE_ENV}`)
      })
      .on('error', (err: Error) => {
        logger.error(err.message)
        process.exit(1)
      })
  }
})()
