import { User } from '../models/user'

export const findUserBy = async (prop: string, value: string) =>
  await User.findOne({ [prop]: value })
export const createUser = ({
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
