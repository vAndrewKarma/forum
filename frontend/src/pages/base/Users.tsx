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
  TextField,
  Box,
  Typography,
} from '@mui/material'
import useAxios from 'axios-hooks'
import { Sort } from '@mui/icons-material'
import { SelectChangeEvent } from '@mui/material'
interface User {
  name: string
  gender: string
}
import { Search } from '@mui/icons-material'

const UserTable: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [users, setUsers] = useState<User[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  const [filterGender, setFilterGender] = useState<string>('All')
  const [sortedByName, setSortedByName] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [scrollLock, setScrollLock] = useState<boolean>(false)
  const [{ data, loading: fetching }, refetch] = useAxios({
    url: `http://localhost:4000/get-users`,
    method: 'POST',
    data: {
      page: page,
    },
  })

  const [getUser, research] = useAxios(
    {
      url: 'http://localhost:4000/get-user',
      method: 'POST',
      data: {
        name: searchTerm,
      },
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (data && data.users) {
      setScrollLock(false)
      setUsers((prevUsers) => [
        ...prevUsers,
        ...data.users.map((user: string) => {
          let [username, gender] = user.split(' ')
          if (gender == 'Not') gender = 'Not specified'
          const name = `${username}`
          return { name, gender }
        }),
      ])
      setLoading(false)
    }
  }, [data])
  useEffect(() => {
    if (getUser.data && getUser.data.users) {
      setScrollLock(true)
      setUsers(() => [
        ...getUser.data.users.map((user: string) => {
          let [username, gender] = user.split(' ')
          if (gender == 'Not') gender = 'Not specified'
          const name = `${username}`
          return { name, gender }
        }),
      ])
      setLoading(false)
    }
  }, [getUser.data])
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loading &&
      !fetching &&
      !scrollLock
    ) {
      setLoading(true)
      setPage((prevPage) => prevPage + 1)
      setScrollLock(true)
      refetch({
        data: { page: page + 1 },
      })
        .then(() => {
          setScrollLock(false)
        })
        .catch(() => {
          setScrollLock(false)
        })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, fetching, scrollLock])

  const handleGenderFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterGender(event.target.value as string)
  }
  const handleSearch = () => {
    setUsers([])
    if (searchTerm.trim() === '') {
      setScrollLock(false)
      refetch({
        data: { page: 1 },
      })
    } else {
      research({
        data: { name: searchTerm },
      })
    }
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
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TextField
          label="Username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton onClick={handleSearch} color="primary">
          <Search />
        </IconButton>
        <Select
          value={filterGender}
          onChange={handleGenderFilterChange}
          style={{ marginLeft: 'auto' }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
        <IconButton onClick={handleSortByName} color="primary">
          <Sort color={sortedByName ? 'primary' : 'disabled'} />
        </IconButton>
      </Box>
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
    </Box>
  )
}

export default UserTable
