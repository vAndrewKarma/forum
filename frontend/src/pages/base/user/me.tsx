import React, { useState } from 'react'
import useAxios from 'axios-hooks'
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
} from '@mui/material'
import useAuth from '../../../components/auth/useAuth'

export default function Me() {
  const { data } = useAuth()
  const [changePasswordRequest, executePasswordRequest] = useAxios(
    {
      url: 'http://localhost:4000/reset_password_profile',
      withCredentials: true,
      method: 'POST',
      data: {
        csrf: data.csrf,
      },
    },
    { manual: true }
  )

  const [activateEmailRequest, executePost] = useAxios(
    {
      url: `http://localhost:4000/activate_email_request`,
      withCredentials: true,
      method: 'POST',
    },
    { manual: true }
  )

  const handlePasswordChange = async () => {
    try {
      await executePasswordRequest({
        data: {
          csrf: data.csrf,
        },
      })
    } catch (error) {
      console.error('Error requesting email verification:', error)
      alert('Failed to request email verification. Please try again later.')
    }
  }
  const handleEmailVerificationRequest = async () => {
    try {
      await executePost()
      // Handle successful email verification request
    } catch (error) {
      console.error('Error requesting email verification:', error)
      alert('Failed to request email verification. Please try again later.')
    }
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4">Profile</Typography>
      </Box>
      <Box mt={3}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          {!data.user?.verified ? (
            <div>
              <Typography variant="h5">Request Email verification</Typography>
              {!activateEmailRequest.data?.succes && (
                <Button
                  variant="contained"
                  onClick={handleEmailVerificationRequest}
                  sx={{ mt: 2 }}
                >
                  Request
                </Button>
              )}

              {activateEmailRequest.loading && (
                <Typography mt={2}>Loading...</Typography>
              )}
              {activateEmailRequest.data?.succes && (
                <Typography mt={2} color="success">
                  Verification email sent successfully!
                </Typography>
              )}
            </div>
          ) : (
            <Typography variant="h5">Email verified</Typography>
          )}
        </Paper>
      </Box>
      <Box mt={3}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <div>
            <Typography variant="h5">Request New Password</Typography>
            {!changePasswordRequest.data?.success && (
              <Button
                variant="contained"
                onClick={handlePasswordChange}
                sx={{ mt: 2 }}
              >
                Request Password Change
              </Button>
            )}

            {changePasswordRequest.loading && (
              <Typography mt={2}>Loading...</Typography>
            )}
            {changePasswordRequest.data?.success && (
              <Typography mt={2} color="success">
                Check your email
              </Typography>
            )}
          </div>
        </Paper>
      </Box>
      <Box mt={3}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5">User Details</Typography>
          <Typography mt={2}>Username: {data.user?.username}</Typography>
          <Typography>Email: {data.user?.email}</Typography>
          <Typography>First Name: {data.user?.firstName}</Typography>
          <Typography>Last Name: {data.user?.lastName}</Typography>
          <Typography>Gender: {data.user?.gender}</Typography>
          {data.user?.verified ? (
            <Typography>Email verified</Typography>
          ) : (
            <Typography>Email not verified</Typography>
          )}
          {/* Display other user details as needed */}
        </Paper>
      </Box>
    </Container>
  )
}
