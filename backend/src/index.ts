const config = require('./config/index')
import process from 'node:process'
import { init } from './lib/mongo'
import fs from 'fs'
import http from 'http'
import https from 'https'
import ExpressInit from './lib/express'
import cluster from 'cluster'
import { availableParallelism } from 'os'
import { logger } from './config/logger'
import { Cluster_listener } from './lib/cluster'
;(async () => {
  const app = await ExpressInit()
  init.mongo // ignore i've used it just so mongoose connects to the db, like an init function
  Cluster_listener // same thing as above.
  if (cluster.isPrimary === true)   for (let i = 0; i < availableParallelism(); i++)  cluster.fork();

  // that if condition checks that the code is only executed once and not by each worker... so every worker does not try to create more workers
  else {
    if (config.NODE_ENV == 'development')
      if (require.main === module) {
        // not started by another entity
        http
          .createServer(app)
          .listen(app.get('port'), function () {
            logger.info(
              `Listening to ${app.get('port')} - ENV: ${config.NODE_ENV} - Worker ${
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
            `Listening to ${app.get('port')} - ENV: ${config.NODE_ENV} - Worker ${
              process.pid
            }`
          )
        })
        .on('error', (err: Error) => {
          logger.error(err.message)
          process.exit(1)
        })
    }
  }
})()
