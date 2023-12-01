import { Request, Response, NextFunction } from 'express'
export default function protected_route(
  redirect: string,
  info: { authenthication_route?: boolean }
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (info.authenthication_route) {
      if (req.isAuthenticated()) {
        return res.redirect(redirect)
      }
    } else {
      if (!req.isAuthenticated()) return res.redirect(redirect)
    }
    return next()
  }
}
