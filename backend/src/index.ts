import config from './config'
import process from 'node:process'
import { init } from './lib/mongo'
import http from 'http'
import ExpressInit from './lib/express'
import { logger } from './common/utils/logger'
;(async () => {
  logger.debug(config.db)
  const app = await ExpressInit()
  init.mongo // ignore i've used it just so mongoose connects to the db, like an init function
  if (require.main === module) {
    // not started by another entity
    if (config.NODE_ENV === 'development' || config.NODE_ENV === 'production')
      http
        .createServer(app)
        .listen(app.get('port'), function () {
          logger.info(
            `Listening to ${app.get('port')} - ENV: ${config.NODE_ENV} - Pid ${
              process.pid
            }`
          )
        })
        .on('error', (err: Error) => {
          logger.error(err.message)
          process.exit(1)
        })
  }
})()
