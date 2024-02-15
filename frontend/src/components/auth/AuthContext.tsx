import { createContext } from 'react'

interface Information {
  loggedIn: boolean
  csrf: string
  user?: user
}
interface user {
  username: string
  firstName: string
  verified: boolean
  gender: string
  lastName: string
  email: string
  ip: any
}
interface AuthContextI {
  data: Information
}

const AuthContext = createContext<AuthContextI>({ data: null! })

export default AuthContext
