import { useContext } from 'react'
import AuthContext from './AuthContext'

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('Context used wrong, it is not wrapped.')
  }
  return context
}

export default useAuth
