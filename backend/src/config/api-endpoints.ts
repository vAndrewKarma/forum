import { Request, Response, NextFunction } from 'express'
import { statusController } from '../controller/status'
import { usersController } from '../controller/user'
import { AuthController } from '../controller/auth'
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
      controller: statusController.metrics,
    },
  },
  user: {
    register: {
      route: '/register',
      controller: usersController.Signup,
    },
    new_location: {
      route: '/new_location',
      controller: usersController.newz_Location,
    },
    reset_password: {
      route: '/reset_password',
      controller: usersController.reset_password,
    },
  },
  auth: {
    login: {
      route: '/login',
      controller: AuthController.Login,
    },
    logout: {
      route: '/logout',
      controller: AuthController.Logout,
    },
    check_auth: {
      route: '/check-auth',
      controller: (_req: Request, res: Response) =>
        res
          .status(201)
          .json({ data: { loggedIn: true, message: 'User logged in' } }),
    },
  },
}
export default endpoint
