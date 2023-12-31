import { z } from 'zod'

export const RegisterUser = z
  .object({
    username: z
      .string()
      .min(3, 'Username should be at least 3 characters')
      .max(20, 'Username can be maximum 20 characters')
      .toLowerCase()
      .regex(/^[a-zA-Z0-9]+$/, 'Username should not contain symbols'),
    password: z
      .string()
      .min(8, 'Password needs to be minimum 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least 1 capital letter')
      .regex(/[0-9]/, 'Password must contain at least 1 number')
      .regex(/[!@#$%^&*]/, 'Password must contain at least 1 symbol')
      .max(16, 'Password can be maximum 16 characters'),
    confirm_password: z.string(),
    email: z
      .string()
      .email('Invalid email')
      .max(40, 'Email can be maximum 40 characters'),
    gender: z.enum(['Not Specified', 'Male', 'Female']).optional(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
  })

export const LoginUser = z.object({
  email: z.string().email('Invalid credentials').max(40, 'Invalid credentials'),
  password: z
    .string()
    .min(8, 'Invalid credentials')
    .regex(/[A-Z]/, 'Invalid credentials')
    .regex(/[0-9]/, 'Invalid credentials')
    .regex(/[!@#$%^&*]/, 'Invalid credentials')
    .max(16, 'Invalid credentials'),
})
export const ResetPassword = z.object({
  email: z.string().email('Invalid credentials').max(40, 'Invalid credentials'),
})

const NEW_location = z.object({
  uid: z
    .string()
    .min(10, 'Invalid link')
    .max(60, 'Invalid link')
    .toLowerCase()
    .regex(/^[a-zA-Z0-9]+$/, 'Invalid link'),
  token: z
    .string()
    .min(10, 'Invalid link')
    .max(60, 'Invalid link')
    .regex(/^[a-zA-Z0-9]+$/, 'Invalid link')
    .toLowerCase(),
})

const new_password = z
  .object({
    uid: z
      .string()
      .min(10, 'Invalid link')
      .max(60, 'Invalid link')
      .toLowerCase()
      .regex(/^[a-zA-Z0-9]+$/, 'Invalid link'),
    token: z
      .string()
      .min(10, 'Invalid link')
      .max(60, 'Invalid link')
      .regex(/^[a-zA-Z0-9]+$/, 'Invalid link')
      .toLowerCase(),
    password: z
      .string()
      .min(8, 'Password needs to be minimum 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least 1 capital letter')
      .regex(/[0-9]/, 'Password must contain at least 1 number')
      .regex(/[!@#$%^&*]/, 'Password must contain at least 1 symbol')
      .max(16, 'Password can be maximum 16 characters'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
  })

export type UserType = z.infer<typeof RegisterUser>

export const validateRegister = (user: UserType) => RegisterUser.parse(user)

export const validateResetPassword = (user: z.infer<typeof ResetPassword>) =>
  ResetPassword.parse(user)

export const validateLogin = (user: z.infer<typeof LoginUser>) =>
  LoginUser.parse(user)

export const validateTokenUid = (new_loc: z.infer<typeof NEW_location>) =>
  NEW_location.parse(new_loc)

export const validateNewPasswordReset = (
  pswd_body: z.infer<typeof new_password>
) => new_password.parse(pswd_body)
