import { useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Logingif from '../../../../assets/login.gif';
import Logo from '../../../../assets/logo.png';

import 'react-toastify/dist/ReactToastify.css';

import { Flex } from 'antd';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleGoogleLogin = async () => {
    window.location.href = 'auth/google/login';
  };

  const handleRegister = async () => {
    const isValidPassword: boolean = /^(?=.*\d|.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      password
    );
    setIsValid(isValidPassword);
    try {
      const response = await axios.post('api/auth/register', {
        username: userName,
        password: password
      });
      console.log(response.data.status);
      if (response.data.status === 201) {
        // console.log('status 200 re inside handle register');
        toast.success('You have Registered', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        // navigate('/login');
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
      // return error;
      toast.error(`${error}`, {
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Register</Typography>
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
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="User Name"
                    label="User Name"
                    name="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!isValid && (
                    <div>
                      <p className="text-sm text-red-500">
                        • Password should contain at least one digit or one special character.
                      </p>
                      <p className="text-sm text-red-500">
                        • Password should not contain a dot or a newline character.
                      </p>
                      <p className="text-sm text-red-500">
                        • Password should contain at least one uppercase letter.
                      </p>
                      <p className="text-sm text-red-500">
                        • Password should contain at least one lowercase letter.
                      </p>
                    </div>
                  )}
                </Grid>
              </Grid>
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleRegister}>
                Register
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link onClick={() => navigate('/login')} to={''}>
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </Flex>
  );
}

export default SignUp;
