import React, { useState } from 'react'
import { useNavigate, Route, Routes } from 'react-router-dom'
import {
  Box,
  Container,
  Divider,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  List,
  CircularProgress,
} from '@mui/material'
import SundayEvents from '../components/admin/SundayEvents'
import RegsForEvents from '../components/admin/RegsForEvents'

const localStorage = window.localStorage

const Admin = ({ setToken }) => {
  const navigate = useNavigate()
  const [isValid, setIsValid] = useState(false)

  // useEffect(() => {

  window.onload = async () => {
    const res = await fetch(
      'https://founders-backend.shakhzodbekkakh.repl.co/welcome',
      {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Access-Control-Allow-Origin': 'no-cors',
        },
      }
    )
    try {
      const data = await res.json()
      if (data.message !== 'valid') {
        setToken(null)
        navigate('/login')
      } else {
        setIsValid(true)
        navigate('/admin/sundayevents')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main>
      {isValid ? (
        <Box bgcolor='light.main' minHeight='100vh'>
          <Box py={1} sx={{ bgcolor: 'primary.main' }}>
            <Container>
              <Stack direction='row' alignItems='center' spacing={1}>
                <img
                  src={require('../images/logo.png').default}
                  alt='Logo'
                  style={{ width: '4rem' }}
                />
                <Typography fontSize='2rem' color='primary.contrastText'>
                  Admin Panel
                </Typography>
              </Stack>
            </Container>
          </Box>
          <Stack
            width='100%'
            direction='row'
            alignItems='flex-start'
            p={2}
            spacing={2}
          >
            <List
              sx={{
                bgcolor: 'primary.main',
                width: '20%',
                color: 'primary.contrastText',
              }}
            >
              <ListItem button onClick={() => navigate('/admin/sundayevents')}>
                <ListItemText primary='Sunday Events' />
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary='Suggestions&Objections' />
              </ListItem>
              <ListItem button>
                <ListItemText primary='Offers for Sunday events' />
              </ListItem>
              <Divider light />
              <ListItem button onClick={() => navigate('/admin/regsforevents')}>
                <ListItemText primary='Registrations for Sunday events' />
              </ListItem>
            </List>
            <Box width='100%'>
              <Routes>
                <Route path='sundayevents' element={<SundayEvents />} />
                <Route path='regsforevent' element={<RegsForEvents />} />
              </Routes>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Stack alignItems='center' justifyContent='center' height='100vh'>
          <CircularProgress size='6rem' />
        </Stack>
      )}
    </main>
  )
}

export default Admin
