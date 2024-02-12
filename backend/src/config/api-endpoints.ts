import { Request, Response, NextFunction } from 'express'
import { statusController } from '../controller/status'
import { usersController } from '../controller/user'
import { AuthController } from '../controller/auth'
import { InformationController } from '../controller/information'
type EndpointTypes = 'auth' | 'user' | 'status' | 'information'

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
    check_email: {
      route: '/activate_email',
      controller: usersController.activate_email,
    },
    activate_email_request: {
      route: '/activate_email_request',
      controller: usersController.request_email_verification_code,
    },
    new_location: {
      route: '/new_location',
      controller: usersController.newz_Location,
    },
    reset_password: {
      route: '/reset_password',
      controller: usersController.reset_password,
    },
    check_link_password_reset: {
      route: '/check_link_password_reset',
      controller: usersController.check_link_password_reset,
    },
    new_password: {
      route: '/new_password',
      controller: usersController.new_password,
    },
    about_me: {
      route: '/about_me',
      controller: usersController.about_me,
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
  information: {
    userInfo: {
      route: '/get-users',
      controller: InformationController.GetUsers,
    },
    getSingleUser: {
      route: '/get-user',
      controller: InformationController.GetSingleUser,
    },
  },
}
export default endpoint
