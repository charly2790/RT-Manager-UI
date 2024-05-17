import React from 'react'
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import dayjs from 'dayjs';
import { Box, Grid, Typography, CssBaseline, TextField, Select, MenuItem, Container } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { constants } from '../../utils/constants';
import '../../styles.css';



export const CreateSesionForm = () => {

  const [fechaSesion, setFechaSesion] = useState(dayjs('1990-05-27'));
  const [tipoSesion, setTipoSesion] = useState('');
  const { url } = constants;  
  const token = localStorage.getItem('token');
  
  let settings = {
    method: 'get',
    url: `${url}/tiposSesion`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    }
  }

  console.log(`settings: ${JSON.stringify(settings.url)}`);
  
  const { data, hasError, isLoading } = useFetch( settings );

  console.log(`data: ${JSON.stringify(data)}`);








  const handleChange = (event) => {
    setTipoSesion(event.target.value);
  };

  return (
    <>
      <Container component="main" maxWidth="xl" 
        sx={{          
          width: '80%', 
          ml:'15%'
          }}>
        <CssBaseline />
        <Box sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography component="h1" variant="h5">
            Nueva Sesión de Entrenamiento
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>

            <Grid container spacing={2} >
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Fecha de la sesión"
                      value={fechaSesion}
                      onChange={(newValue) => {
                        setFechaSesion(newValue);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="objetivo"
                  label="Objetivo"
                  name="objetivo"
                  autoComplete="family-name"
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  labelId="select-tipo-sesion"
                  id="select-tipo-sesion"
                  value={tipoSesion}
                  onChange={handleChange}
                  fullWidth
                  label="Age"
                >
                  <MenuItem value={10}>Fondo</MenuItem>
                  <MenuItem value={20}>Pasadas</MenuItem>
                  <MenuItem value={30}>Carniceria</MenuItem>
                </Select>
              </Grid>


            </Grid>
          </Box>
        </Box>

      </Container>


    </>
  )
}
