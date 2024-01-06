/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'
import AuthContext from './AuthContext'
import useAxios from 'axios-hooks'
import { Typography } from '@mui/material'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ data, loading, error }] = useAxios({
    url: `http://localhost:4000/about_me`,
    withCredentials: true,
  })
  console.log(data)

  if (loading) {
    return (
      <main>
        <Typography component="h1" variant="h1">
          Loading
        </Typography>
      </main>
    )
  }
  if (error) return
  ;<main>
    {error && (
      <Typography color="error" sx={{ textAlign: 'left' }}>
        {(error as any)?.response
          ? JSON.parse(JSON.stringify((error as any).response.data.message))
          : null}
      </Typography>
    )}
  </main>

  return (
    <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
