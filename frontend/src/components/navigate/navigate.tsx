import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import NotesIcon from '@mui/icons-material/Notes'
import PeopleIcon from '@mui/icons-material/People'
import MyNotesIcon from '@mui/icons-material/EmojiObjects'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import VpnKeyIcon from '@mui/icons-material/VpnKey' // Emoji for Sign In
import PersonAddIcon from '@mui/icons-material/PersonAdd' // Emoji for Sign Up
import MailIcon from '@mui/icons-material/Mail' // Emoji for Contact Me
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useAuth from '../auth/useAuth'
import useAxios from 'axios-hooks'

const drawerWidth = 240

interface Props {
  window?: () => Window
}

const ResponsiveAppBar: React.FC<Props> = (props) => {
  const { window } = props
  const navigate = useNavigate()
  const [{ loading, error }, executePost] = useAxios(
    {
      url: `http://localhost:4000/logout`,
      withCredentials: true,
      method: 'POST',
    },
    { manual: true }
  )
  const [mobileOpen, setMobileOpen] = useState(false)
  const auth = useAuth()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleSignOut = async () => {
    await executePost()
    return navigate(0)
  }
  console.log(error)
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/notes">
            <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {!auth.data.loggedIn && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/sign-in">
                <ListItemIcon>
                  <VpnKeyIcon /> {/* Emoji for Sign In */}
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/sign-up">
                <ListItemIcon>
                  <PersonAddIcon /> {/* Emoji for Sign Up */}
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {auth.data.loggedIn && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/my-notes">
                <ListItemIcon>
                  <MyNotesIcon />
                </ListItemIcon>
                <ListItemText primary="My Notes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/me">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={loading ? 'Loading...' : 'Sign Out'} />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {/* Contact Me link */}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/contact-me">
            <ListItemIcon>
              <MailIcon /> {/* Emoji for Contact Me */}
            </ListItemIcon>
            <ListItemText primary="Contact Me" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex', mb: 6, mr: 4 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Notes App
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default ResponsiveAppBar
