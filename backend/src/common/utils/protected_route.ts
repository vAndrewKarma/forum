import { Request, Response, NextFunction } from 'express'
export default function protected_route(info: {
  authenthication_route?: boolean
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (info.authenthication_route) {
      if (req.isAuthenticated()) {
        return res.json({
          data: {
            loggedIn: true,
            message: 'User already loggedIn',
          },
        })
      }
    } else {
      if (!req.isAuthenticated())
        return res.status(401).json({
          data: {
            loggedIn: false,
            message: 'User not loggedIn',
          },
        })
    }
    return next()
  }
}
