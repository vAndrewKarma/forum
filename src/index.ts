import config from './config'
import process from 'node:process'
import { mongoose } from './lib/mongo'
import fs from 'fs'
import http from 'http'
import https from 'https'
import ExpressInit from './lib/express'
import { logger } from './common/utils/logger'
;(async () => {
  const app = await ExpressInit()
  if (config.NODE_ENV == 'development')
    if (require.main === module) {
      // not started by another entity

      mongoose.model // ignore i've used it just so mongoose connects to the db, like an init function

      http
        .createServer(app)
        .listen(config.app.port, function () {
          logger.info(
            `Listening to ${config.app.port} - ENV: ${config.NODE_ENV}`
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
      .listen(config.app.port, function () {
        logger.info(`Listening to ${config.app.port} - ENV: ${config.NODE_ENV}`)
      })
      .on('error', (err: Error) => {
        logger.error(err.message)
        process.exit(1)
      })
  }
})()
