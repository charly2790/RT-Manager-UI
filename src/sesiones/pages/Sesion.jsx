import { AuthContext } from '../../auth';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Grid, Grow, InputAdornment, InputLabel, Snackbar, TextField, ThemeProvider, Typography } from '@mui/material';
import { buildRequest } from '../../helpers';
import { createTheme } from '@mui/material/styles';
import {
  FileInput,
  SelectInput,
  TimeInput
} from '../../components';
import { mainTheme } from '../../themes/mainTheme';
import { methods } from '../../types';
import { styles } from './styles'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DataCell } from '../components';
import dayjs from 'dayjs';
import { subDir } from '../types';
import Axios from 'axios';
import _, { isEmpty } from 'lodash';

const theme = createTheme();

const getUpdatedKeys = ( formFields, defaultFields ) => {  
  /* const updatedData = updatedKeys.map( key => {
    return { [key] : formFields[key]}
    }) */   
   return Object.keys(defaultFields).filter(field =>{
     return formFields[field] !== defaultFields[field];
   })
}


export const Sesion = () => {
  
  const { state } = useLocation();
  const { userLogged: { idUsuario, token, rol } } = useContext(AuthContext);
  const [ disableFields, setDisableFields ] = useState(false);
  const [ showAdminFields, setShowAdminFields ] = useState(false);
  const [ apiMessage, setApiMessage ] = useState("");
  const navigate = useNavigate();
  
  const sesion = state ? state.sesion : undefined;
  const { EstadoSesion : { descripcion : estadoSesion }  } = sesion;
  
  useEffect(() => {
    if (rol === 'EQUIPO_ADMIN') {      
      setShowAdminFields(true);
    } else if(rol === 'EQUIPO_MEMBER'){
      if( estadoSesion === 'HECHA'){
        setDisableFields(true);  
      }
    }
  }, [])


  console.log('Sesion: ', sesion);

  const {
    register,
    handleSubmit,
    formState: { 
      errors, 
      isSubmitSuccessful, 
      isDirty, 
      dirtyFields },
    control,
    setValue
  } = useForm({
    disabled: disableFields,
    defaultValues:{
      ...sesion.Entrenamiento,
    }
  })

  const onNavigateBack = () => {
    navigate(-1)
  }


  const onSubmit = handleSubmit(async (data) => {      

    let updatedKeys = Object.keys(data);        
    const isCreate = _.isEmpty(sesion.Entrenamiento);
    const formData = new FormData();
    
    if(!isCreate){      
      updatedKeys = !isEmpty(dirtyFields) ? Object.keys(dirtyFields) : [];      
    }
        
    updatedKeys.forEach(field => {
      formData.append(field, data[field]);
    })        

    formData.append('idUsuario', idUsuario);
    formData.append('idSesion', sesion.idSesion);

    const reqEntrenamiento = buildRequest(
      isCreate ? subDir.entrenamientos : `${subDir.entrenamientos}/${sesion.Entrenamiento.idEntrenamiento}`,
      isCreate ? methods.post : methods.patch,
      formData,
      token,
      'multipart/form-data'
    )

    const res = await Axios.request(reqEntrenamiento);

    if (res.status === 200 && res.statusText === 'OK') {

      const { idSesion } = sesion;      
      
      const params = {
        idSesion,
      }

      const reqSesion = buildRequest(
        subDir.updateStatus,
        methods.patch,
        params,
        token,
      );

      const res = await Axios.request(reqSesion);

      if (res.status === 200 && res.statusText === 'OK') {        
        const { data: {message}} = res;
        setApiMessage(message);
      }

    }

  })

  return (
    <ThemeProvider theme={mainTheme}>
       {
          isSubmitSuccessful && <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={onNavigateBack}
            message={apiMessage}
          />
        }
      <Accordion sx={{ width: '95%' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
        >
          <Typography component="h1" variant="h5">
            Sesion #1 - Semana del 20/05/2024 al 26/05/2024
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            spacing={2}
          >
            <DataCell
              title={"Fecha de Sesión"}
              value={dayjs(sesion.fechaSesion).format("DD-MM-YYYY")}
              settings={{
                icon: "EVENT",
              }}
            />
            <DataCell
              title={"Tipo de Sesion"}
              value={sesion ? sesion.TipoSesion.descripcion : ''}
              settings={{
                icon: "DIRECTION_RUN",
              }}
            />
            <DataCell
              title={"Estado de la sesión"}
              value={sesion ? sesion.EstadoSesion.descripcion : ''}
              settings={sesion ? sesion.EstadoSesion.idEstado === 1
                ? { icon: "PENDING", color: "info.main" }
                : sesion.EstadoSesion.idEstado === 2
                  ? { icon: "DONE", color: "sucess.dark" }
                  : { icon: "WARNING", color: "error.main" }
                : { icon: "PENDING", color: "info.main" }
              }

            />
            <DataCell
              title={"Objetivo"}
              value={sesion ? sesion.Objetivo : ''}
              settings={{ icon: "GOAL" }}
            />
            <DataCell
              title={"Comentarios"}
              value={sesion.comentarios ? sesion.comentarios : 'Recordar agregar campo al modelo'}
              settings={{ icon: 'COMMENTS' }}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Box
        component="form"
        noValidate
        sx={{ pt: 1, pr: 2, pb: 2, pl: 2 }}
        onSubmit={onSubmit}
      >       
        <Typography component="h1" variant="h5" sx={{ mb: 2, mt: 2 }}>
          Entrenamiento
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          {
            showAdminFields &&
            <Grid item xs={12} md={6}>
              <InputLabel id="distancia" sx={{ mt: 2 }}>{"Distancia"}</InputLabel>
              <TextField
                sx={styles.textfield}
                type='number'                
                InputProps={{
                  startAdornment: <InputAdornment position="start">km</InputAdornment>,
                }}
                {...register("distancia")}
              />
            </Grid>
          }
          {
            showAdminFields &&
            <Grid item xs={12} md={6}>
              <TimeInput
                control={control}
                name="tiempoTotal"
                label="Tiempo total de la sesión"
                styles={styles.textfield}
                defaultValue={'2022-04-17T00:00'}
                disabled={false}
                showInputLabel={true}
                inputLabelStyles={{ mt: 2 }}
              />
            </Grid>
          }
          {
            showAdminFields &&
            <Grid item xs={12} md={6}>
              <TimeInput
                control={control}
                name="tiempoNeto"
                label="Tiempo neto de la sesión"
                styles={styles.textfield}
                defaultValue={'1990-05-27T00:00'}
                disabled={false}
                showInputLabel={true}
                inputLabelStyles={{ mt: 1 }}
              />
            </Grid>
          }
          {
            showAdminFields &&
            <Grid item xs={12} md={6}>
              <SelectInput
                control={control}
                name="rpe"
                //TODO Agrupar opciones(ver MUI), ver posibilidad de agregar íconos
                options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                styles={styles.textfield}
                label="RPE"
                defaultOption={'0'}
                showInputLabel={true}
                inputLabelStyles={{ mt: 1 }}
              />
            </Grid>
          }
          <Grid item xs={12} md={6}>
            <InputLabel id="link" mt={2} sx={{ mt: 1 }}>{"Link"}</InputLabel>
            <TextField
              error={errors.link ? true : false}
              required
              sx={styles.textfield}
              id="link"
              disabled={disableFields}
              name="link"
              value={undefined}
              {...register("link", {
                required: {
                  value: true,
                  message: 'El link es requerido'
                },
                minLength: {
                  value: 3,
                  message: 'Debe contener al menos 3 caracteres'
                }
                //TODO validar con REGEX
              })}
              helperText={errors.link ? errors.link.message : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileInput
              control={control}
              label={"Archivo"}
              name={"archivo"}
              showInputLabel={true}
              styles={styles.textfield}
              inputLabelStyles={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id="comentario" sx={{ mt: 2 }}>{"Comentario"}</InputLabel>
            <TextField
              multiline
              disabled={disableFields}
              rows={2}
              required
              id="comentario"
              name="comentario"
              autoComplete="family-name"
              sx={styles.textfield}
              {...register("comentario")}
            />

          </Grid>
          <Grid container item xs={12} sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 1,
            mb: 3,
            [theme.breakpoints.down('sm')]: { pr: 1 }
          }}>
            <Grid container item xs={6} md={3} sx={styles.actionButtonContainer}>
              <Button
                variant='outlined'
                sx={styles.actionButton}
                size='large'
                onClick={onNavigateBack}
              >
                {"Atras"}
              </Button>
            </Grid>
            <Grid item xs={6} md={3} sx={styles.actionButtonContainer}>
              <Button
                disabled={disableFields || !isDirty}
                variant='contained'
                sx={styles.actionButton}
                size='large'
                type='submit'
              >
                {"Guardar"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
