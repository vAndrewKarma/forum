import { User } from '../models/user'
import bcrypt from 'bcrypt'
export const Signup = async (req, res, next) => {
  try {
    const { email, password, username, firstName, lastName, gender } = req.body
    //generate hash salt for password
    const salt = await bcrypt.genSalt(12)
    //generate the hashed version of users password
    const hashed_password = await bcrypt.hash(password, salt)
    const user = await User.create({
      email,
      password: hashed_password,
      username,
      firstName,
      lastName,
      gender,
    })
    if (user) {
      res.status(201).json({ message: user })
    }
  } catch (err) {
    return next(err)
  }
}
