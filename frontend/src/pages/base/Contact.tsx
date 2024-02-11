import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import GitHubIcon from '@mui/icons-material/GitHub'
import YouTubeIcon from '@mui/icons-material/YouTube'

const ContactPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        marginLeft: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: '900px', textAlign: 'center', padding: '20px' }}>
        <Typography
          variant="h1"
          sx={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}
        >
          Contact Page
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            href="https://github.com/vAndrewKarma"
            startIcon={<GitHubIcon sx={{ fontSize: '5rem' }} />}
          >
            GitHub
          </Button>
          <Button
            href="https://www.youtube.com/channel/UCoegPiSTttKBkgnFh_mgJzA"
            startIcon={<YouTubeIcon sx={{ fontSize: '5rem' }} />}
          >
            YouTube
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ContactPage
