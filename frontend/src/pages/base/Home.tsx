import React from 'react'
import useAxios from 'axios-hooks'
import Button from '@mui/material/Button'
import useAuth from '../../components/auth/useAuth'
import { Typography } from '@mui/material'

export default function Home() {
  const { data } = useAuth()
  const [activateEmailRequest, executePost] = useAxios(
    {
      url: `http://localhost:4000/activate_email_request`,
      withCredentials: true,
      method: 'POST',
    },
    { manual: true }
  )
  const handleSubmit = async () => {
    await executePost()
  }

  let buttonText = 'Click here to request an email verification'
  if (activateEmailRequest.loading) {
    buttonText = 'Loading...'
  } else if (activateEmailRequest.data && activateEmailRequest.data.succes) {
    buttonText = 'Verification email sent'
  }

  return (
    <div>
      {data.loggedIn ? (
        <div>
          <h1>Welcome back, {data.user?.username} !</h1>
          {!data.user?.verified && !activateEmailRequest.data?.succes && (
            <Button onClick={handleSubmit}>{buttonText}</Button>
          )}
          {!data.user?.verified && activateEmailRequest.data?.succes && (
            <Typography>{buttonText}</Typography>
          )}
        </div>
      ) : null}
    </div>
  )
}
