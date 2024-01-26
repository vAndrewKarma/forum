import { ReactNode } from 'react'
import useAuth from './useAuth'
import { Navigate } from 'react-router-dom'

interface ProtectedProps {
  children: ReactNode
  redirectIfAuthenticated?: boolean
  needsAuth?: boolean
}

const Protected = ({
  children,
  redirectIfAuthenticated,
  needsAuth,
}: ProtectedProps) => {
  const { data } = useAuth()

  console.log(`
  ---------------------------  inside protected
  ${JSON.stringify(data)}
  ----------------------------`)
  const isAuthenticated = data.loggedIn
  console.log(isAuthenticated)

  if (redirectIfAuthenticated && isAuthenticated) return <Navigate to="/" />
  if (needsAuth && !isAuthenticated) return <Navigate to="/sign-in" />

  return <>{children}</>
}

export default Protected
