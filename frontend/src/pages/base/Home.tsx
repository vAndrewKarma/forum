import useAxios from 'axios-hooks'
import Button from '@mui/material/Button'
export default function Home() {
  const [{ data, loading, error }, refetch] = useAxios(
    'http://localhost:4000/about_me'
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>{JSON.stringify(error)}</p>

  return (
    <div>
      <Button onClick={() => refetch()} variant="contained">
        refetch
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>;
    </div>
  )
}
