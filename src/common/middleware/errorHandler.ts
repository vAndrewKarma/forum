import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ZodError } from 'zod'
import Template from '../errors/template'
export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err)
  if (err instanceof Template) {
    return res
      .status(err.statusCode)
      .send({ message: `${err.message}`, field: err.field })
  }

  if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.NotBeforeError ||
    err instanceof jwt.TokenExpiredError
  ) {
    return res.status(406).send({ message: `${err.message}`, field: 'JWT' })
  }
  if (err instanceof ZodError) {
    return res.status(411).send({
      message: `${err.issues[0].message}`,
      field: `${err.issues[0].path}`,
    })
  }

  console.log(err)
  return res.status(500).send({ message: `Something unknown just happened.` })
}
