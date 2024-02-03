import useAxios from 'axios-hooks'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'

export default function Home() {
  const [{ data, loading, error }, refetch] = useAxios({
    withCredentials: true,
    url: `http://localhost:4000/about_me`,
  })

  if (loading) return <p>Loading...</p>
  if (error)
    return (
      <Typography color="error" sx={{ textAlign: 'left' }}>
        {error.response && (
          <div>
            <h1>Error</h1>
            <p>
              {' '}
              {JSON.parse(JSON.stringify(error.response.data.message))}
            </p>{' '}
          </div>
        )}
      </Typography>
    )

  return (
    <div>
      <Button onClick={() => refetch()} variant="contained">
        refetch
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>;
    </div>
  )
}
