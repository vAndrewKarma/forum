import express from 'express'
import protected_route from '../common/utils/protected_route'
import page from '../config/pages-ejs'
const router = express.Router()

router.get(
  '/register',
  protected_route(page.profile.route, { authenthication_route: true }),
  (_req, res) => {
    res.render('register')
  }
)

router.get(
  page.profile.route,
  protected_route('/login', { authenthication_route: false }),
  (_req, res) => {
    res.render('profile')
  }
)
router.get(
  '/login',
  protected_route(page.profile.route, { authenthication_route: true }),
  (_req, res) => {
    res.render('login')
  }
)
export { router as viewRoutes }
