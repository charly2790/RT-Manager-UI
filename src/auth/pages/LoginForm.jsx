import { AuthContext } from '../context';
import { mainTheme } from '../../themes/mainTheme';
import { ThemeProvider } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React, { useContext, useEffect, useState } from 'react'
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


export const LoginForm = () => {
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },    
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

    setFormState({
      ...formState,      
      isLoading: true,
    });

    login({idEquipo, email, password});

    try {      
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
