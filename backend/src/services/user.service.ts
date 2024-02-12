import { FilterQuery } from 'mongoose'
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
  findAllUsersBy: (findexpression: string) => Promise<UserDocument[]>
}

export const UserMethods: TUserMeth = {
  findUserBy: undefined,
  createUser: undefined,
  saveUser: undefined,
  getAll: undefined,
  findAllUsersBy: undefined,
}

UserMethods.getAll = async (page: number, findExpresion: string) => {
  const limit = 20
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

UserMethods.findAllUsersBy = async (findexpression: string) => {
  // Split the search query into first name and last name
  const [firstName, lastName] = findexpression.split(' ')

  // Construct a regular expression that matches both orders of first name and last name
  const regex = new RegExp(
    `(${firstName}.*${lastName})|(${lastName}.*${firstName})`,
    'i'
  )

  // Construct the filter query object
  const filterQuery: FilterQuery<UserDocument> = {
    $or: [
      // Match first name followed by last name or vice versa
      {
        $or: [
          {
            $and: [
              { firstName: { $regex: new RegExp(firstName, 'i') } },
              { lastName: { $regex: new RegExp(lastName, 'i') } },
            ],
          },
          {
            $and: [
              { lastName: { $regex: new RegExp(lastName, 'i') } },
              { firstName: { $regex: new RegExp(firstName, 'i') } },
            ],
          },
        ],
      },
    ],
  }

  // Find users matching the filter query
  return await User.find(filterQuery)
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
