import { createContext } from 'react'

interface Information {
  loggedIn: boolean
  csrf: string
  user?: object
}

interface AuthContextI {
  data: Information
}

const AuthContext = createContext<AuthContextI>({ data: null! })

export default AuthContext
