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
}

export const UserMethods: TUserMeth = {
  findUserBy: undefined,
  createUser: undefined,
  saveUser: undefined,
}

UserMethods.findUserBy = async (prop: string, value: string) =>
  await User.findOne({ [prop]: value })

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
