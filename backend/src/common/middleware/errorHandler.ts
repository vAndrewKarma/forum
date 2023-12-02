import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import Template from '../errors/template'
import UserNotExists from '../errors/custom/UserNotExists'
import endpoint from '../../config/api-endpoints'
import BadCookie from '../errors/custom/BadCookie'
export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err)
  if(err instanceof UserNotExists || err instanceof BadCookie) return endpoint.auth.logout.controller(req,res,next)

  if (err instanceof Template) {
    return res
      .status(err.statusCode)
      .send({ message: `${err.message}`, field: err.field })
  }

  if (err instanceof ZodError) {
    return res.status(411).send({
      message: `${err.issues[0].message}`,
      field: `${err.issues[0].path}`,
    })
  }

  return res.status(500).send({ message: `Something unknown just happened.` })
}
