import {
  getCPUUsage,
  getFreeMemory,
  getProcessUptime,
  getTotalMemory,
  getUsedMemory,
} from '../common/utils/metrics'
import { Response, Request } from 'express-serve-static-core'

export const metrics = (_req: Request, res: Response) =>
  res.json({
    cpuUsage: `${getCPUUsage()}%`,
    totalMemory: `${getTotalMemory()} MB`,
    freeMemory: `${getFreeMemory()} MB`,
    usedMemory: `${getUsedMemory()} MB`,
    processUptime: `${getProcessUptime()} seconds`,
  })
