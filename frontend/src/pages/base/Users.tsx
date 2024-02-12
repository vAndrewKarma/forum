import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material'
import useAxios from 'axios-hooks'
import { Sort } from '@mui/icons-material'

interface User {
  name: string
  gender: string
}

const UserTable: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [filterGender, setFilterGender] = useState<string>('All')
  const [sortedByName, setSortedByName] = useState<boolean>(false)

  const [{ data, loading: fetching }, refetch] = useAxios({
    url: `http://localhost:4000/get-users`,
    method: 'POST',
    data: {
      page: page,
    },
  })

  useEffect(() => {
    if (data && data.users) {
      setUsers((prevUsers) => [
        ...prevUsers,
        ...data.users.map((user: string) => {
          let [firstName, lastName, gender] = user.split(' ')
          if (gender == 'Not') gender = 'Not specified'
          const name = `${firstName} ${lastName}`
          return { name, gender }
        }),
      ])
      setLoading(false)
    }
  }, [data])

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!loading && !fetching) {
        setLoading(true)
        setPage((prevPage) => prevPage + 1)
        setTimeout(() => {
          refetch({
            data: { page: page + 1 },
          })
        }, 50)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, fetching])

  const handleGenderFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFilterGender(event.target.value as string)
  }

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })

    setUsers(sortedByName ? sortedUsers.reverse() : sortedUsers)
    setSortedByName(!sortedByName)
  }

  const filteredUsers = users.filter((user) =>
    filterGender === 'All' ? true : user.gender === filterGender
  )

  return (
    <div>
      <Select value={filterGender} onChange={handleGenderFilterChange}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </Select>
      <IconButton onClick={handleSortByName}>
        <Sort />
      </IconButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && data.message !== '404' && <CircularProgress />}
      </TableContainer>
    </div>
  )
}

export default UserTable
