// Dependencies
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// MUI
import { Box, Stack, Fade, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const Slider = ({ items }) => {
  const containerRef = useRef()
  const [current, setCurrent] = useState(0)
  return (
    <Box px={6} py={4} position='relative'>
      <Stack ref={containerRef} direction='row'>
        <Stack
          sx={{
            position: 'absolute',
            bgcolor: 'info.light',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '0',
            padding: '0',
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() =>
            setCurrent(current === 0 ? items.length - 1 : current - 1)
          }
        >
          <ChevronLeftIcon
            sx={{ color: 'info.contrastText' }}
            fontSize='large'
          />
        </Stack>
        <Stack
          sx={{
            position: 'absolute',
            bgcolor: 'info.light',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '0',
            padding: '0',
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() =>
            setCurrent(current === items.length - 1 ? 0 : current + 1)
          }
        >
          <ChevronRightIcon
            sx={{ color: 'info.contrastText' }}
            fontSize='large'
          />
        </Stack>
        {items.map((item, i) => (
          <Fade
            in={current === i}
            id={i}
            key={i}
            container={containerRef.current}
            display={current !== i ? 'none' : 'flex'}
          >
            <Stack
              direction='column'
              alignItems='center'
              bgcolor='info.light'
              minWidth='100%'
              borderRadius={2}
              px={2}
              py={4}
            >
              <item.icon style={{ fontSize: '6rem' }} />
              <Typography>{item.description}</Typography>
              {item.link && (
                <Link
                  to={item.link.path}
                  style={{
                    textDecoration: 'underline',
                    fontSize: '1.4rem',
                    color: 'secondary.main',
                  }}
                >
                  {item.link.name}
                </Link>
              )}
            </Stack>
          </Fade>
        ))}
      </Stack>
    </Box>
  )
}

export default Slider
