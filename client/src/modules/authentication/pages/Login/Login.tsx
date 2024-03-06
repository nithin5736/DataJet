import React, { useEffect, useState } from 'react';
import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { Flex } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Logingif from '../../../../assets/login.gif';
import { useAppSelector } from '../../shared/hooks/useAppSelector';

import 'react-toastify/dist/ReactToastify.css';

import Logo from '../../../../assets/logo.png';
import axios from 'axios';

const Login: React.FC = () => {
  const state = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = async () => {
    window.location.href = 'https://datajet-backend.onrender.com/api/auth/google/login';
  };

  useEffect(() => {
    if (state.loggedIn) {
      navigate('/');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('api/auth/login', {
        username: userName,
        password: password
      });
      console.log(response);
      if (response.data.status === 200) {
        //  console.log("res   ",response.data.data.accessToken);
        navigate(`/${response.data?.data?.accessToken}`);
      } else {
        toast.error(response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Flex className="h-screen w-screen bg-slate-200" vertical justify="center" align="center">
      <div className="mb-10 rounded">
        <img className="rounded" src={Logo} alt="" height={100} width={150} />
      </div>
      <div className="flex items-center justify-center p-4 gap-40">
        <div className="flex flex-col items-center justify-center p-4 gap-20 pt-0">
          <div className="flex flex-col items-center text-xl">
            <p className="font-bold text-2xl">Hello🖐,</p>
            <p className="flex font-bold text-2xl items-center">
              Welcome to <p className="pl-2 text-3xl text-sky-600">DataJet!</p>
            </p>
          </div>
          <Container maxWidth="xs">
            <img src={Logingif} className="w-full " />
          </Container>
        </div>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '0px'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Sign In</Typography>
            <Box sx={{ mt: 1 }}>
              <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 1 }}>
                <img
                  src="https://app.tooljet.com/assets/images/onboardingassets/SSO/Google.svg"
                  className="pr-4 relative h-8"
                />
                <Typography className="relative text-md font-semibold" onClick={handleGoogleLogin}>
                  Login with Google
                </Typography>
              </Button>
              <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ color: 'grey' }}>or</Typography>
              </Grid>
              <TextField
                required
                fullWidth
                id="User Name"
                label="User Name"
                name="User Name"
                value={userName}
                sx={{ mt: 1 }}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
                Login
              </Button>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <Grid container justifyContent={'flex-end'}>
                <Grid item>
                  <Link to={'/signUp'}>Don't have an account? Register</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </Flex>
  );
};

export default Login;
