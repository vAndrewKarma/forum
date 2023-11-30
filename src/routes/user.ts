import express from 'express'
import { Signup } from '../controller/user'
const router = express.Router()

// Register route
router.post('/register', Signup)

router.get('/register', (_req, res) => {
  res.render('register')
})

export { router as UserRoutes }
