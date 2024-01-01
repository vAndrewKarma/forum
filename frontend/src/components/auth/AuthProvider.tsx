import { ReactNode } from 'react'
import AuthContext from './AuthContext'
import useAxios from 'axios-hooks'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ data, loading, error }] = useAxios({
    url: 'http://localhost:4000/about_me',
    withCredentials: true,
  })
  console.log(data)
  if (error) return <p>{JSON.stringify(error)}</p>

  if (loading)
    return (
      <main className="flex  items-center justify-center min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="py-16">
            <h1 className="text-3xl font-semibold text-gray-200">
              Loading the Page !
            </h1>
            <p className="mt-2 text-gray-400">Please wait...</p>
          </div>
        </div>
      </main>
    )

  return (
    <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
