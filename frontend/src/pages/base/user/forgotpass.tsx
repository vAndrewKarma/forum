import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { TypographyProps } from '@mui/material/Typography'
import useAxios from 'axios-hooks'
import useAuth from '../../../components/auth/useAuth'
import { useState } from 'react'

function Copyright(props: TypographyProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function ForgotPass() {
  const info = useAuth()
  const [success, setSuccess] = useState<string>('')
  const [{ loading, error }, executePost] = useAxios(
    {
      url: `http://localhost:4000/reset_password`,
      withCredentials: true,
      method: 'POST',
    },
    { manual: true }
  )
  const updateData = async (information: { email: string }) => {
    const { data } = await executePost({
      data: {
        email: information.email,
        csrf: info.data.csrf,
      },
    })
    console.log(data)
    if (data.success) setSuccess('Verify your email address')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const information = {
      email: form.get('email')?.toString() || '',
    }

    await updateData(information)
  }
  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            {error && (
              <Typography color="error" sx={{ textAlign: 'left' }}>
                {error.response && (
                  <p>
                    {JSON.parse(JSON.stringify(error.response.data.message))}
                  </p>
                )}
              </Typography>
            )}

            {success && !error && (
              <Typography color="success" sx={{ textAlign: 'left' }}>
                {success}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Loading...' : 'Sign'}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  )
}
