import { Request, Response, NextFunction } from 'express'
import { metrics } from '../controller/status'
import { Signup } from '../controller/user'
import { Login, Logout } from '../controller/auth'
type EndpointTypes = 'auth' | 'user' | 'status'

type ApiEndpoint = {
  [key: string]: {
    route: string
    controller: (req: Request, res: Response, next: NextFunction) => void
  }
}

type ApiEndpoints = {
  [key in EndpointTypes]: ApiEndpoint // used a mapped type to define ApiEndpoints
}

const endpoint: ApiEndpoints = {
  status: {
    _alivez: {
      route: '/_alivez',
      controller: (_req, res) => res.sendStatus(200),
    },
    _metricz: {
      route: '/_metricz',
      controller: metrics,
    },
  },
  user: {
    register: {
      route: '/register',
      controller: Signup,
    },
  },
  auth: {
    login: {
      route: '/login',
      controller: Login,
    },
    logout: {
      route: '/logout',
      controller: Logout,
    },
    check_auth: {
      route: '/check-auth',
      controller: (_req: Request, res: Response) =>
        res.json({ data: { loggedIn: true, message: 'User logged in' } }),
    },
  },
}
export default endpoint
