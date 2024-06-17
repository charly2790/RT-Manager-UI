import React, { useEffect, useReducer, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography, CssBaseline, Container, ThemeProvider, IconButton, Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import { sesionesReducer } from './sesionesReducer';
import { mainTheme } from '../../themes/mainTheme';
import { SesionForm } from './SesionForm';
import { SesionesTable } from './SesionesTable';
import { constants } from '../../utils/constants';

import qs from 'qs';
import '../../styles.css';
import Axios from 'axios';


const init = () => {
  return JSON.parse(localStorage.getItem('sesiones')) || [];
}

const appendButton = (sesiones, handleMethod) => {
  return sesiones.map((sesion) => (
    {
      ...sesion,
      acciones: (
        <IconButton aria-label='delete' onClick={() => handleMethod(sesion.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ))
}


export const SesionesAdmin = () => {

  const { url } = constants;
  const { state: { alumno } } = useLocation();
  const navigate = useNavigate(); 
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

  const [sesiones, dispatch] = useReducer(sesionesReducer, [], init);

  const handleAddSesion = (sesion) => {
    dispatch({ type: '[SESIONES] Add Sesion', payload: sesion })
  }

  const handleDeleteSesion = (id) => {
    dispatch({ type: '[SESIONES] Delete Sesion', payload: id })
  }
  
  const handleClearSesiones = () => {
    dispatch({ type: '[SESIONES] Clear Sesiones' })
  }
  useEffect(() => {
    localStorage.setItem('sesiones', JSON.stringify(sesiones))
  }, [sesiones])

  const handleSubmit = async () => {    
    
    const nuevasSesiones = sesiones.map(({ idSuscripcion, idTipoSesion, Objetivo, fechaSesion }) => {
      return { 
        idSuscripcion, 
        idTipoSesion, 
        Objetivo, 
        fechaSesion }
    })

    try{
      const { result } = await Axios.request(createSettings({'sesiones': nuevasSesiones}));
      localStorage.removeItem('sesiones');
      navigate("/sesiones", {state: { alumno }})
      console.log(result);

    }catch(error){
      console.error(error.message);      
    }
  }

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
              handleDeleteSesion={handleDeleteSesion} />
            <Box
              sx={{
                // border: '3px solid yellow',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 10,
                width: '50%',
                border: '1px dotted red',                
              }}
            >
              <Typography component="h1" variant="h5">Nuevas sesiones</Typography>
              <SesionesTable data={appendButton(sesiones, handleDeleteSesion)} handleDeleteSesion={handleDeleteSesion} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, width: '90%' }}
                onClick={ handleSubmit }
              >
                Guardar
              </Button>
            </Box>
          </Box>

        </Container>
      </ThemeProvider>
    </>
  )
}
