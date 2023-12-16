import { Request, Response } from 'express'
import {
  getCPUUsage,
  getFreeMemory,
  getProcessUptime,
  getTotalMemory,
  getUsedMemory,
} from '../common/utils/metrics'

type TstatusController = {
  metrics: (_req: Request, res: Response) => void
}
export const statusController: TstatusController = {
  metrics: undefined,
}
statusController.metrics = (_req: Request, res: Response) =>
  res.json({
    cpuUsage: `${getCPUUsage()}%`,
    totalMemory: `${getTotalMemory()} MB`,
    freeMemory: `${getFreeMemory()} MB`,
    usedMemory: `${getUsedMemory()} MB`,
    processUptime: `${getProcessUptime()} seconds`,
  })
