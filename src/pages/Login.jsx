import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { Snackbar, Alert, Stack } from '@mui/material'
const Login = ({ setToken }) => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [allow, setAllow] = useState(false)
  useEffect(() => {
    const pathname = window.location.pathname
    const checkValid = () => {
      fetch('https://founders.uz/backend/welcome', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Access-Control-Allow-Origin': 'no-cors',
        },
      })
        .then(async (res) => {
          const data = await res.json()
          if (data.message !== 'valid') {
            setToken(null)
            navigate('/login')
          } else {
            navigate(`/admin/${localStorage.getItem('adminpath')}`)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    if (pathname === '/login') {
      checkValid()
    }
  }, [navigate, setToken])
  const responseGoogle = async (gRes) => {
    const email = gRes.profileObj.email
    const id = gRes.googleId
    //Validate inputs
    if (!(email && id)) {
      return alert('All inputs must be filled!')
    }
    const user = JSON.stringify({ email, id })
    const res = await fetch('https://founders.uz/backend/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: user,
    })
    if (res.status === 405) {
      setError('You are not allowed to enter this pages!')
    } else if (res.status === 401) {
      setError('You have to register to get in!')
      setAllow(true)
    } else if (res.ok) {
      const data = await res.json()
      if (data) {
        await setToken(data.token)
        navigate('/admin')
      }
    }
  }
  return (
    <>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        direction='column'
        spacing={2}
      >
        <>
          <GoogleLogin
            clientId={
              window.location.hostname === 'localhost'
                ? '1010777994659-c0e9tob38lbmohe1abp966ik9v44h76o.apps.googleusercontent.com'
                : '1010777994659-vrdecvqdg01rl2ojo3qkqabd1rr7jgkt.apps.googleusercontent.com'
            }
            buttonText='Login with Google'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
          {allow && <Link to='/register'>Get access to Admin Panel</Link>}
        </>
      </Stack>
      <Snackbar
        open={error ? true : false}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity='error'
          sx={{
            width: '100%',
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}
export default Login
