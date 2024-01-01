import { ReactNode } from 'react'
import useAuth from './useAuth'
import { Navigate } from 'react-router-dom'

interface ProtectedProps {
  children: ReactNode
  AuthRoute?: boolean
  needsAuth?: boolean
}

const Protected = ({ children, AuthRoute, needsAuth }: ProtectedProps) => {
  const { data } = useAuth()

  console.log(`
  ---------------------------  inside protected
  ${JSON.stringify(data)}
  ----------------------------`)
  const isAuthenticated = data.loggedIn === true
  console.log(isAuthenticated)

  if (AuthRoute && isAuthenticated) return <Navigate to="/" />
  if (needsAuth && !isAuthenticated) return <Navigate to="/sign-in" />

  return <>{children}</>
}

export default Protected
