import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import Template from '../errors/template'
export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err)
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
