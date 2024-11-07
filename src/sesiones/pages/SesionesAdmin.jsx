import '../../styles.css';
import { AuthContext } from '../../auth';
import { Box, Typography, CssBaseline, Container, ThemeProvider, IconButton, Button } from '@mui/material'
import { buildRequest } from '../../helpers';
import { mainTheme } from '../../themes/mainTheme';
import { methods } from '../../types';
import { SesionesTable } from '../components';
import { SesionForm } from '../components';
import { subDir } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSesionesEntrenamiento } from '../hooks';
import Axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useContext } from 'react'


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
  
  const { state: { alumno } } = useLocation();
  const { userLogged } = useContext(AuthContext);  
  const navigate = useNavigate(); 
  const { sesiones, handleAddSesion, handleDeleteSesion, handleClearSesiones } = useSesionesEntrenamiento();

  const handleSubmit = async () => {    
    
    const nuevasSesiones = sesiones.map(({ idSuscripcion, idTipoSesion, Objetivo, fechaSesion }) => {
      return { 
        idSuscripcion, 
        idTipoSesion, 
        Objetivo, 
        fechaSesion }
    })

    try{
      const reqSettings = buildRequest( subDir.sesionesEntrenamiento, methods.post, {'sesiones': nuevasSesiones}, userLogged.token );      
      const { result } = await Axios.request(reqSettings);
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
