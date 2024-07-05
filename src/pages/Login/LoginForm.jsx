import React, { useContext, useEffect, useState } from 'react'
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
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';
import qs from 'qs';
import { constants } from '../../utils/constants';

import { useForm } from 'react-hook-form';
import { UserContext } from '../Context/UserContext';


export const LoginForm = () => {

  let { url } = constants;
  
  const navigate = useNavigate();
  const { setUserLogged } = useContext( UserContext );
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm()

  const [formState, setFormState] = useState({    
    isLoading: false,
    success: false,
    hasError: false,
    errorMessage: '',
  });

  
  const onSubmit = handleSubmit(async (data) => {

    let { email, password } = data;
    let idEquipo = 1;

    let settings = {
      method: 'post',
      url: `${url}/login`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({ idEquipo, email, password })
    }

    setFormState({
      ...formState,      
      isLoading: true,
    });

    await new Promise( resolve => setTimeout(resolve, 1500) );

    try {
      const { data: { userLogged } } = await Axios.request(settings);      
      setUserLogged( userLogged );
      setFormState({
        ...formState,
        isLoading: false,
        success: true
      })
    } catch (error) {
      console.error(error.message);
    }
    
  })

  useEffect(() => {
    formState.success? navigate("/"):null
  }, [formState.success])

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
              onSubmit={onSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {
                ...register("email", {
                  required: {
                    value: true,
                    message: "El campo email es requerido"
                  },
                })
                }
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
                {
                ...register("password", {
                  required: {
                    value: true,
                    message: 'El campo contraseña es requerido'
                  }
                })
                }
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {
                formState.isLoading ?
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    onClick={onSubmit}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Accediendo...
                  </Button> :
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={onSubmit}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Acceder
                  </Button>
              }
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
