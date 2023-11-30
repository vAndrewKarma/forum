import express from 'express'
import { Login, Logout } from '../controller/auth'
import checkAuth from '../common/utils/check-auth'
const router = express.Router()

// Login route
router.post('/login', Login)

// Logout route
router.get('/logout', Logout)

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/checkauth', checkAuth, (req, res) => {
  res.render('checkauth')
})
export { router as AuthRoutes }
