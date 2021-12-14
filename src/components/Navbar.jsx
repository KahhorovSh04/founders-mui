import React from 'react'
import logo from './../images/logo.png'
import logoDark from './../images/logo-dark.png'
import { Container, Box, Stack, Typography, Button, Link } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar = ({
  setOpenMenu,
  theme,
  setTheme,
  lightTheme,
  darkTheme,
  isMobile,
}) => {
  const clickHandler = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }
  const toggleMenu = () => {
    setOpenMenu(true)
  }
  return (
    <Box bgcolor='primary.main' color='primary.contrastText' py='1rem'>
      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack direction='row' alignItems='center' spacing={5}>
            <Stack direction='row' alignItems='center'>
              <img
                src={theme === lightTheme ? logoDark : logo}
                width='65'
                alt='Founders Logo'
              />
              <Stack>
                <Typography
                  sx={{
                    fontWeight: '500',
                    lineHeight: 'normal',
                    fontSize: '1.1rem',
                  }}
                >
                  FOUNDERS
                </Typography>
                <Typography fontSize='0.9rem' lineHeight='normal'>
                  LANGUAGE
                </Typography>
                <Typography fontSize='0.9rem' lineHeight='normal'>
                  SCHOOL
                </Typography>
              </Stack>
            </Stack>
            {!isMobile && (
              <>
                <Link
                  href='#courses'
                  style={{ fontSize: '1.4rem' }}
                  color='inherit'
                  underline='hover'
                >
                  Courses
                </Link>
                <Link
                  href='#instructors'
                  style={{ fontSize: '1.4rem' }}
                  color='inherit'
                  underline='hover'
                >
                  Instructors
                </Link>
                <Link
                  href='#contacts'
                  style={{ fontSize: '1.4rem' }}
                  color='inherit'
                  underline='hover'
                >
                  Contact us
                </Link>
              </>
            )}
          </Stack>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='row'
            spacing={2}
          >
            {isMobile && (
              <>
                <Button
                  sx={{
                    border: '1px solid',
                    borderColor: 'primary.contrastText',
                    px: 0,
                  }}
                  onClick={() => toggleMenu()}
                >
                  <MenuIcon
                    fontSize='large'
                    sx={{ color: 'primary.contrastText' }}
                  />
                </Button>
              </>
            )}
            {!isMobile && (
              <>
                <Link
                  href='tel:+998712055333'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'inherit',
                  }}
                >
                  <Stack
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='50%'
                    bgcolor='secondary.main'
                    p={1}
                    mr={1}
                  >
                    <LocalPhoneIcon color='primary' />
                  </Stack>
                  <Typography component='span' fontSize='1.2rem'>
                    +998 71 205 53 33
                  </Typography>
                </Link>
                <Button onClick={() => clickHandler()}>
                  {theme === lightTheme ? (
                    <Brightness7Icon sx={{ color: 'primary.contrastText' }} />
                  ) : (
                    <Brightness4Icon sx={{ color: 'primary.contrastText' }} />
                  )}
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Navbar
