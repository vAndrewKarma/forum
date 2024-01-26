import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import useAxios from 'axios-hooks'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Sign_out() {
  const navigate = useNavigate()

  const [{ data, loading, error }] = useAxios({
    url: `http://localhost:4000/logout`,
    withCredentials: true,
    method: 'POST',
  })
  useEffect(() => {
    if (data.loggedIn === false) return navigate(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loggedIn])

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

          {error && (
            <Typography color="error" sx={{ textAlign: 'left' }}>
              {error.response && 'Error'}
            </Typography>
          )}

          {loading && 'Loading...'}
        </Box>
      </Container>
    </>
  )
}
