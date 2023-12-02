import cluster from 'cluster'
import { logger } from '../config/logger'

cluster.on('exit', (worker, code, signal) => {
  logger.debug(
    `worker ${worker.process.pid} has been killed with code: ${code} and signal  ${signal}`
  )
  logger.debug('Starting another worker')
  cluster.fork()
})

export { cluster as Cluster_listener }
