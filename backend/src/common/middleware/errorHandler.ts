import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod'
import Template from '../errors/template'
import endpoint from '../../config/api-endpoints'

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next:NextFunction
) {
  console.error(err)
 
  if (err instanceof Template) {
  if(err.logout) return endpoint.auth.logout.controller(req,res,next)
 
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
