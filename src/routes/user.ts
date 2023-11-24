import { Router } from 'express'
const router = Router()

router.get('/heavy', (req, res) => {
  let total = 0
  for (let i = 0; i < 5_000_000; i++) {
    total++
  }
  res.send(`The result of the CPU intensive task is ${total}\n`)
})
export { router as UserRoutes }
