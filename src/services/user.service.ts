import { User } from '../models/user'

export const findUserBy = async (prop: string, value: string) =>
  await User.findOne({ [prop]: value })
