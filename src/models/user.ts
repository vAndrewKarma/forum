import mongoose, { Document, Model } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserAttributes {
  token: string
  username: string
  password: string
  email: string
  gender: 'Not Specified' | 'Male' | 'Female'
  firstName?: string
  lastName?: string
}

export interface UserDocument extends UserAttributes, Document {}

interface UserModel extends Model<UserDocument> {
  comparePassword(password: string, passwordHash: string): boolean
  findByUsername(username: string): Promise<UserDocument | null>
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    gender: {
      type: String,
      enum: ['Not Specified', 'Male', 'Female'],
      default: 'Not Specified',
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next) {
  next()
})
UserSchema.statics.findAll = () => {
  return User.find({}, { __v: 0 }).lean().exec()
}
UserSchema.statics.comparePassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash)
}
UserSchema.statics.findById = (id) => {
  return User.findOne({ _id: id }, { __v: 0 }).lean().exec()
}

UserSchema.statics.findByUsername = (username) => {
  return User.findOne({ username }, { __v: 0 }).lean().exec()
}
UserSchema.statics.findByEmail = (email) => {
  return User.findOne({ email }, { __v: 0 }).lean().exec()
}
UserSchema.statics.removeUser = (id) => {
  return User.deleteOne({ _id: id }).exec()
}

UserSchema.statics.updateUser = (user) => {
  return User.updateOne({ _id: user._id }, { $set: user }).exec()
}
const User = mongoose.model<UserDocument, UserModel>('User', UserSchema)

export { User }
