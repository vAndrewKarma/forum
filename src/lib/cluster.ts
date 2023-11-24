import cluster from 'cluster'
import { logger } from '../common/utils/logger'

cluster.on('exit', (worker, code, signal) => {
  logger.info(
    `worker ${worker.process.pid} has been killed with code: ${code} and signal  ${signal}`
  )
  logger.info('Starting another worker')
  cluster.fork()
})

export { cluster as Cluster_listener }
