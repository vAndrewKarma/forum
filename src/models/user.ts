import mongoose, { Document, Model } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserAttributes {
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
UserSchema.pre('save', async function (next) {
  const user = this as UserDocument

  if (!user.isModified('password')) {
    return next()
  }

  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    user.password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})

UserSchema.statics.comparePassword = async (
  password: string,
  passwordHash: string
) => {
  return await bcrypt.compare(password, passwordHash)
}

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema)

export { User }
