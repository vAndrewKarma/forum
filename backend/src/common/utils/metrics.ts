import os from 'os'

const MB = 1024 * 1024

export function getCPUUsage() {
  const cpus = os.cpus()
  const totalCPUTime = cpus.reduce(
    (acc, core) =>
      acc +
      core.times.user +
      core.times.nice +
      core.times.sys +
      core.times.idle +
      core.times.irq,
    0
  )
  const idleCPUTime = cpus.reduce((acc, core) => acc + core.times.idle, 0)
  return (100 - (idleCPUTime / totalCPUTime) * 100).toFixed(2)
}

export function getTotalMemory() {
  return (os.totalmem() / MB).toFixed(2)
}

export function getFreeMemory() {
  return (os.freemem() / MB).toFixed(2)
}

export function getUsedMemory() {
  const usedMemory = os.totalmem() - os.freemem()
  return (usedMemory / MB).toFixed(2)
}

export function getProcessUptime() {
  return process.uptime()
}
