import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import Container from '@mui/material/Container'
import { TypographyProps } from '@mui/material/Typography'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import useAxios from 'axios-hooks'
import useAuth from '../../../components/auth/useAuth'
import { useNavigate } from 'react-router-dom'

type Gender = 'Not Specified' | 'Male' | 'Female'

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

export default function SignUp() {
  const info = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const [{ loading, error }, executePost] = useAxios(
    {
      url: `http://localhost:4000/register`,
      withCredentials: true,
      method: 'POST',
    },
    { manual: true }
  )
  const [gender, setGender] = React.useState<Gender | undefined>(
    'Not Specified'
  )

  const handleChange = (event: SelectChangeEvent<Gender>) => {
    const selectedGender: Gender = event.target.value as Gender

    setGender(selectedGender)
  }
  const updateData = async (information: {
    email: string
    password: string
    gender: string
    username: string
    confirm_password: string
    firstName: string
    lastName: string
  }) => {
    await executePost({
      data: {
        email: information.email,
        password: information.password,
        confirm_password: information.confirm_password,
        username: information.username,
        gender: information.gender,
        lastName: information.lastName,
        csrf: info.data.csrf,
        firstName: information.firstName,
      },
    })
    return navigate(0)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const information = {
      email: data.get('email')?.toString() || '',
      password: data.get('password')?.toString() || '',
      confirm_password: data.get('confirm_password')?.toString() || '',
      username: data.get('username')?.toString() || '',
      gender: gender || 'Not Specified', // Use 'Not Specified' as default
      firstName: data.get('firstName')?.toString() || '',
      lastName: data.get('lastName')?.toString() || '',
    }

    await updateData(information)
  }

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item sx={{ mt: 2 }} xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item sx={{ mt: 2 }} xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
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
            <Grid item sx={{ mt: 2, mb: 2 }} xs={12}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 190 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="Not Specified">Not Specified</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {error && (
              <Typography color="error" sx={{ textAlign: 'left' }}>
                {error.response && (
                  <p>
                    {JSON.parse(JSON.stringify(error.response.data.message))}
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
              {loading ? 'Loading...' : 'Sign up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  )
}
