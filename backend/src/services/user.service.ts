import { logger } from '../common/utils/logger'
import { User, UserDocument } from '../models/user'

type TUserMeth = {
  findUserBy: (prop: string, value: string) => Promise<UserDocument>
  createUser: ({
    username,
    email,
    password,
    gender,
    ip,
    firstName,
    lastName,
  }: {
    username: string
    email: string
    password: string
    gender: string
    ip: string
    firstName?: string
    lastName?: string
  }) => UserDocument
  saveUser: (user: UserDocument) => Promise<void>
  getAll: (page: number, findExpresion: string) => Promise<UserDocument[]>
  findAllUsersBy: (
    findexpression: string,
    field: string
  ) => Promise<UserDocument[]>
}

export const UserMethods: TUserMeth = {
  findUserBy: undefined,
  createUser: undefined,
  saveUser: undefined,
  getAll: undefined,
  findAllUsersBy: undefined,
}

UserMethods.getAll = async (page: number, findExpresion: string) => {
  const limit = 45
  const startIndex = (page - 1) * limit
  try {
    const users = await User.find({}, findExpresion)
      .skip(startIndex)
      .limit(limit)
    logger.debug(users)
    return users
  } catch (error) {
    console.error('Error fetching all users:', error)
    throw error
  }
}
UserMethods.findUserBy = async (prop: string, value: string) =>
  await User.findOne({ [prop]: value })

UserMethods.findAllUsersBy = async (findexpression: string, field: string) => {
  try {
    const regex = new RegExp(findexpression, 'i') //regex for fuzzy search

    const users = await User.find({ [field]: { $regex: regex } }).exec()
    return users
  } catch (err) {
    console.error('Error finding users:', err)
    return []
  }
}

UserMethods.createUser = ({
  username,
  email,
  password,
  gender,
  ip,
  firstName,
  lastName,
}: {
  username: string
  email: string
  password: string
  gender: string
  ip: string
  firstName?: string
  lastName?: string
}) => new User({ username, email, password, gender, ip, firstName, lastName })

UserMethods.saveUser = async (user: UserDocument) => {
  await user.save()
}
