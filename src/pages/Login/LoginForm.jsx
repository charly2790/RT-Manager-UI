import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { mainTheme } from '../../themes/mainTheme';
import Axios from 'axios';
import qs from 'qs';

const useLogin = async (loginParams) => {

  const { email, password } = loginParams;

  let params = qs.stringify({
    'email': email,
    'password': password,
    'idEquipo': 1
  });

  let config = {
    method: 'post',
    url: 'http://localhost:3003/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params
  };

  try {
    const { data:{token} } = await Axios.request(config);
    localStorage.setItem('token', token);    
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export const LoginForm = () => {

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    useLogin(formState);

  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?marathon)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // border: '1px dotted blue'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <SportsScoreIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Acceder
            </Typography>
            <Box
              component="form"
              /*utilizar biblioteca de validación de formularios*/
              sx={{ mt: 1, width: '100%' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onInputChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onInputChange}
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={onSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Acceder
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidé mi contraseña
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"¿Aún no tienes una contraseña? ¡Registrate!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
