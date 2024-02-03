import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import useAxios from 'axios-hooks'

import { useParams } from 'react-router-dom'

export default function New_Location() {
  const { uid, token } = useParams()
  console.log(uid, token)
  const [{ data, loading, error }] = useAxios({
    url: `http://localhost:4000/new_location`,
    withCredentials: true,
    method: 'POST',
    data: {
      token,
      uid,
    },
  })
  if (error) {
    return (
      <Typography color="error">
        {error.response && (
          <>
            <h1>Error</h1>
            <h4>Invalid link</h4>
            <p> If the issue persists please contact the site owner</p>
          </>
        )}
      </Typography>
    )
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
            New location
          </Typography>

          {data && (
            <Typography sx={{ textAlign: 'left' }}>
              {data.success && 'Location updated'}
            </Typography>
          )}

          {loading && 'Loading...'}
        </Box>
      </Container>
    </>
  )
}
