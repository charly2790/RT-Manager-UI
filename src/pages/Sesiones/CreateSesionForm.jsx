import React from 'react'
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { LoadingMessage } from '../../components/Shared/LoadingMessage/LoadingMessage';
import { Box, Grid, Typography, CssBaseline, TextField, Select, MenuItem, Container, InputLabel, FormControl, Button, ThemeProvider } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { constants } from '../../utils/constants';
import { mainTheme } from '../../themes/mainTheme';
import dayjs from 'dayjs';
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

  const { data, hasError, isLoading } = useFetch(settings);

  const handleChange = (event) => {
    setTipoSesion(event.target.value);
  };

  let tiposSesion = data ? data.tiposSesion : [];

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Container component="main" maxWidth="xl"
          sx={{
            width: '80%',
            ml: '15%'
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
            {
              isLoading ? <LoadingMessage />
                : <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="select-tipo-sesion"
                          sx={{ mt: 1 }}
                        >Tipo Sesión</InputLabel>
                        <Select
                          labelId="select-tipo-sesion"
                          id="select-tipo-sesion"
                          value={tipoSesion}
                          label="Tipo Sesión"
                          onChange={handleChange}
                          sx={{ mt: 1 }}
                        >
                          {
                            tiposSesion.map((tipo) => {
                              return <MenuItem value={tipo.idTipoSesion}>{tipo.descripcion}</MenuItem>
                            })
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker']} >
                          <DatePicker
                            label="Fecha de la sesión"
                            value={fechaSesion}
                            onChange={(newValue) => {
                              setFechaSesion(newValue);
                            }}                            
                            sx={{ width: '100%' }}
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
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Guardar
                  </Button>
                </Box>
            }
          </Box>

        </Container>
      </ThemeProvider>
    </>
  )
}
