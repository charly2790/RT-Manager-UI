import React, { useEffect, useReducer, useState } from 'react'
import { Box, Typography, CssBaseline, Container, ThemeProvider } from '@mui/material'
import { useLocation } from 'react-router-dom';
import { sesionesReducer } from './sesionesReducer';
import { mainTheme } from '../../themes/mainTheme';
import { SesionForm } from './SesionForm';
import { NakedTable } from '../../components/NakedTable';
import { constants } from '../../utils/constants';
import qs from 'qs';
import '../../styles.css';


const columns = [
  {
    header: "Fecha",
    accessorKey: "fechaSesion",
  },
  {
    header: "Objetivo",
    accessorKey: "Objetivo",
  },
  {
    header: "Tipo de Sesion",
    accessorKey: "idTipoSesion",
  },
  {
    header: "Acciones",
    accessorKey: "acciones",
  }
]

const init = () => {
  return JSON.parse(localStorage.getItem('sesiones')) || [];
}


export const SesionesAdmin = () => {

  const { url } = constants;
  const { state: { alumno } } = useLocation();
  const token = localStorage.getItem('token');  

  let createSettings = (params) => ({
    method: 'post',
    url: `${url}/sesionesEntrenamiento`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
    data: qs.stringify(params)
  })
  
  const [ sesiones, dispatch ] = useReducer( sesionesReducer, [], init);

  const handleAddSesion = ( sesion ) => {
    dispatch({ type: '[SESIONES] Add Sesion', payload: sesion})
  }

  const handleDeleteSesion = ( id ) => {
    dispatch({ type: '[SESIONES] Delete Sesion', payload: id})
  }

  useEffect(() => {
    localStorage.setItem('sesiones', JSON.stringify(sesiones))
  }, [sesiones])
  
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Container component="main" maxWidth="xl"
          sx={{
            width: '100%',
            // ml: '15%'
          }}>
          <CssBaseline />
          <Box
            sx={{
              border: '3px solid green',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <SesionForm
              idSuscripcion={alumno.Suscripcions[0].idSuscripcion}
              handleAddSesion={handleAddSesion}
              handleDeleteSesion={handleDeleteSesion}/>
            <Box
              sx={{
                // border: '3px solid yellow',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 10,
                width: '50%',
              }}
            >
              <Typography component="h1" variant="h5">Nuevas sesiones</Typography>
              <NakedTable columns={columns} data={sesiones} />
            </Box>
          </Box>

        </Container>
      </ThemeProvider>
    </>
  )
}
