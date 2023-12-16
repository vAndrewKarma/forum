import config from './config'
import process from 'node:process'
import { init } from './lib/mongo'
import fs from 'fs'
import http from 'http'
import https from 'https'
import ExpressInit from './lib/express'
import { logger } from './config/logger'
;(async () => {
  logger.debug(config.db)
  logger.debug(config.cache)
  const app = await ExpressInit()
  init.mongo // ignore i've used it just so mongoose connects to the db, like an init function
  if (config.NODE_ENV == 'development')
    if (require.main === module) {
      // not started by another entity
      http
        .createServer(app)
        .listen(app.get('port'), function () {
          logger.info(
            `Liste ning to ${app.get('port')} - ENV: ${config.NODE_ENV} - Pid ${
              process.pid
            }`
          )
        })
        .on('error', (err: Error) => {
          logger.error(err.message)
          process.exit(1)
        })
    }
  if (config.NODE_ENV == 'production') {
    const credentials = {
      key: fs.readFileSync('my-api.key', 'utf8'),
      cert: fs.readFileSync('my-api.cert', 'utf8'),
    }
    https
      .createServer(credentials, app)
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
