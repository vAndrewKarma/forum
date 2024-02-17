import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import useAxios from 'axios-hooks'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../../../components/auth/useAuth'
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function Reset_Password_Profile() {
  const info = useAuth()
  const { uid, token } = useParams()
  const navigate = useNavigate()
  console.log(uid, token)
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const [checkLink] = useAxios({
    url: `http://localhost:4000/check_link_password_reset_profile`,
    withCredentials: true,
    method: 'POST',
    data: {
      token,
      uid,
    },
  })
  const [NewPassword, executePost] = useAxios(
    {
      url: `http://localhost:4000/new_password_profile`,
      withCredentials: true,
      method: 'POST',
    },
    { manual: true }
  )
  const updateData = async (information: {
    confirm_password: string
    password: string
  }) => {
    const { data } = await executePost({
      data: {
        uid,
        token,
        password: information.password,
        confirm_password: information.confirm_password,
        csrf: info.data.csrf,
      },
    })
    console.log(data)

    return navigate(0)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const information = {
      password: data.get('password')?.toString() || '',
      confirm_password: data.get('confirm_password')?.toString() || '',
    }

    await updateData(information)
  }
  if (checkLink.error?.response?.data.message === 'Link already used')
    return (
      <Typography>
        {checkLink.error.response && (
          <>
            <h1>Password has changed</h1>
            <p> If the issue persists please contact the site owner</p>
            <Link href="/sign-in">Click here to return to log in page</Link>
          </>
        )}
      </Typography>
    )
  if (checkLink.error)
    return (
      <Typography color="error">
        {checkLink.error.response && (
          <>
            <h1>Error</h1>
            <h4>Invalid link</h4>
            <p> If any issue persists please contact the site owner</p>
          </>
        )}
      </Typography>
    )
  console.log(checkLink.response?.data)
  if (checkLink.loading) return <> {checkLink.loading ? 'Loading...' : null}</>
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type={'password'}
                  id="confirm_password"
                  autoComplete="confirm_password"
                />
              </Grid>
            </Grid>

            {NewPassword.error && (
              <Typography color="error" sx={{ textAlign: 'left' }}>
                {NewPassword.error.response && (
                  <p>
                    {' '}
                    {JSON.parse(
                      JSON.stringify(NewPassword.error.response.data.message)
                    )}
                  </p>
                )}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {NewPassword.loading ? 'Loading...' : 'Sign up'}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
