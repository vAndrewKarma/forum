import { Response, Request, NextFunction } from 'express'
import { validPage, validateGetBystring } from '../common/utils/validation'
import sanitize from '../common/utils/mongo-sanitize'
import { logger } from '../common/utils/logger'
import { UserMethods } from '../services/user.service'
type TInfoController = {
  GetUsers: (req: Request, res: Response, next: NextFunction) => void

  GetSingleUser: (req: Request, res: Response, next: NextFunction) => void
}
export const InformationController: TInfoController = {
  GetUsers: undefined,
  GetSingleUser: undefined,
}

InformationController.GetUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page } = sanitize(JSON.parse(JSON.stringify(validPage(req.body))))

    const users = await UserMethods.getAll(page, `firstName lastName gender`)
    if (users.length < 1) return res.send({ message: '404' })
    const parsed = users.map((user) => {
      return `${user.firstName} ${user.lastName} ${user.gender}`
    })
    return res.json({
      users: parsed,
    })
  } catch (error) {
    return next(error)
  }
}

InformationController.GetSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = sanitize(
      JSON.parse(JSON.stringify(validateGetBystring(req.body)))
    )
    const users = await UserMethods.findAllUsersBy(name)
    if (users.length < 1) return res.send({ message: '404' })
    const parsed = users.map((user) => {
      return `${user.firstName} ${user.lastName} ${user.gender}`
    })
    return res.json({
      users: parsed,
    })
  } catch (error) {
    return next(error)
  }
}
