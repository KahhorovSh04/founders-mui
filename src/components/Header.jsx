import React from 'react'
// import banner from '../images/header.png'
import { Box, Typography } from '@mui/material'

const Header = ({ isMobile }) => {
  return (
    <Box
      color='primary.contrastText'
      position='relative'
      bgcolor='primary.main'
    >
      <video
        autoPlay
        muted
        loop
        zindex={-1}
        style={{ height: '100%', width: '100%' }}
      >
        <source
          src={require('./../videos/background.mp4').default}
          type='video/mp4'
        />
      </video>
      <Typography
        variant={isMobile ? 'h5' : 'h1'}
        fontWeight={700}
        position='absolute'
        top='50%'
        left='50%'
        color='#fff'
        sx={{
          transform: 'translate(-50%, -50%)',
          textShadow: '2px 2px 10px #000',
          fontFamily: 'Dancing Script',
        }}
        zIndex={1}
      >
        We Grow Together
      </Typography>
    </Box>
  )
}

export default Header
