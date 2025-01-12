import { AuthContext } from '../context';
import { buildRequest } from '../../helpers';
import { CircularProgress } from '@mui/material';
import { mainTheme } from '../../themes/mainTheme';
import { methods } from '../../types';
import { subdir } from '../types'
import { ThemeProvider } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Axios from "axios";
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
  const [ randomUrlImage, setRandomUrlImage ] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {

    let { email, password } = data;
    let idEquipo = 1;    

    await login({ idEquipo, email, password });

  })

  useEffect(() => {
    isSubmitSuccessful ? navigate("/") : null
  }, [isSubmitSuccessful])
  
  useEffect(()=>{
    const params = { query: 'marathon' }
    const reqConfigs = buildRequest( subdir.RANDOM_IMAGE, methods.get, params );
    const result = Axios.request( reqConfigs ).then( res => {
      console.log('res--->', res.data.url);
      setRandomUrlImage( res.data.url );
    });
  },[])  

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
            backgroundImage: `url(${randomUrlImage})`,            
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}                
                sx={{ mt: 3, mb: 2 }}
              >
                { isSubmitting 
                  ? <CircularProgress size={24} /> 
                  : 'Acceder' 
                }
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Olvidé mi contraseña
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" disabled={true}>
                    {"¿Aún no tienes una cuenta? ¡Registrate!"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
