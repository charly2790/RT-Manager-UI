import { AuthContext } from '../../auth';
import { Box, Button, Divider, Grid, InputAdornment, InputLabel, TextField, ThemeProvider, Typography } from '@mui/material';
import { buildRequest } from '../../helpers';
import { createTheme } from '@mui/material/styles';
import {
  DateInput,
FileInput,
  SelectInput,
  TimeInput
} from '../../components';
import { mainTheme } from '../../themes/mainTheme';
import { methods } from '../../types';
import { styles } from './styles'
import { subDir } from '../types';
import { useFetch } from '../../hooks';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom'
import React, { useContext, useState } from 'react'

const theme = createTheme();

export const Sesion = () => {

  const { sesionId } = useParams();
  const { state } = useLocation();
  const { userLogged } = useContext(AuthContext);
  const [sesionFieldsState, setSesionFieldsState] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    control,
    setValue
  } = useForm()

  const reqTipoSesionSettings = buildRequest(subDir.tiposSesion, methods.get, {}, userLogged.token);
  const { data, hasError, isLoading } = useFetch(reqTipoSesionSettings);

  const reqSesionStatesSettings = buildRequest(subDir.estadoSesion, methods.get, {}, userLogged.token);
  const { data: dataSesionStates, hasError: hasErrorSesionStates, isLoading: isLoadingSesionStates } = useFetch(reqSesionStatesSettings);


  const sesion = state ? state.sesion : undefined;
  console.log('sesion-->', sesion);
  let tiposSesion = data ? data.tiposSesion : [];
  let estadosDeSesion = dataSesionStates ? dataSesionStates.estadosDeSesion : [];

  const onSubmit = handleSubmit((data) => {
    console.log('handle submit')
  })
  const handleComplete = () => {
    console.log('¡Vas a completar la sesión!');
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Box
        component="form"
        noValidate
        sx={{ mt: 3 }}
        onSubmit={onSubmit}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sesion #1 - Semana del 20/05/2024 al 26/05/2024
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputLabel id="fechaSesion">{"Fecha de la sesión"}</InputLabel>
            <DateInput
              control={control}
              name="fechaSesion"
              label=""
              styles={styles.textfield}
              defaultValue={sesion.fechaSesion} // setear valor por default
              disabled={sesionFieldsState}
              showInputLabel={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectInput
              control={control}
              name="idTipoSesion"
              options={tiposSesion.map(tipo => tipo.descripcion)}
              styles={styles.textfield}
              label="Tipo de sesión"
              defaultOption={sesion ? sesion.TipoSesion.descripcion : ''}
              disabled={sesionFieldsState}
              showInputLabel={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectInput
              control={control}
              name="estadoSesion"
              options={estadosDeSesion.map(estado => estado.descripcion)}
              styles={styles.textfield}
              label="Estado de sesión"
              defaultOption={sesion ? sesion.EstadoSesion.descripcion : ''}
              disabled={sesionFieldsState}
              showInputLabel={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id="objetivo">{"Objetivo"}</InputLabel>
            <TextField
              error={errors.objetivo ? true : false}
              multiline
              required
              sx={styles.multilineTextField}
              rows={2}
              id="objetivo"
              label={!sesion.Objetivo ? 'Objetivo' : ''}
              name="objetivo"
              value={sesion ? sesion.Objetivo : ''}
              disabled={sesionFieldsState}
              autoComplete="family-name"
              {...register("Objetivo", {
                required: {
                  value: true,
                  message: 'El objetivo es requerido'
                },
                minLength: {
                  value: 3,
                  message: 'Debe contener al menos 3 caracteres'
                }
              })}
              helperText={errors.Objetivo ? errors.Objetivo.message : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id="comentarios">{"Comentarios"}</InputLabel>
            <TextField
              error={errors.objetivo ? true : false}
              multiline
              required
              sx={styles.multilineTextField}
              rows={2}
              id="objetivo"
              label={!sesion.Objetivo ? 'Objetivo' : ''}
              name="objetivo"
              value={"Cargar comentarios"} //TODO - Reemplazar por comentario
              disabled={sesionFieldsState}
              autoComplete="family-name"
              {...register("comentarios")}
            />
          </Grid>          
        </Grid>
        <Typography component="h1" variant="h5" sx={{ mb: 2, mt: 2 }}>
          Entrenamiento
        </Typography>
        <Divider />
        <Grid container spacing={2}>
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
          <Grid item xs={12} md={6}>
            <TimeInput
              control={control}
              name="tiempoTotalSesion"
              label="Tiempo total de la sesión"
              styles={styles.textfield}
              defaultValue={'2022-04-17T00:00'}
              disabled={false}
              showInputLabel={true}
              inputLabelStyles={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TimeInput
              control={control}
              name="tiempoNetoSesion"
              label="Tiempo neto de la sesión"
              styles={styles.textfield}
              defaultValue={'1990-05-27T00:00'}
              disabled={false}
              showInputLabel={true}
              inputLabelStyles={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectInput
              control={control}
              name="rpe"
              //TODO Agrupar opciones(ver MUI), ver posibilidad de agregar íconos
              options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
              styles={styles.textfield}
              label="RPE"
              defaultOption={'1'}
              showInputLabel={true}
              inputLabelStyles={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id="link" mt={2} sx={{mt:1}}>{"Link"}</InputLabel>
            <TextField
              error={errors.link ? true : false}
              required
              sx={styles.textfield}
              id="link"
              name="link"
              value={null}
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
          <Grid container item xs={12} sx={{
            display: 'flex', 
            justifyContent: 'flex-end', 
            mt: 1,
            mb: 3,
            [theme.breakpoints.down('sm')]:{ pr: 1}}}>
              <Grid container item xs={6} md={3} sx={styles.actionButtonContainer}>
                <Button
                  variant='outlined'
                  sx={styles.actionButton}
                  size='large'
                >
                  {"Atras"}
                </Button>
              </Grid>
              <Grid xs={6} md={3} sx={styles.actionButtonContainer}>
              <Button
                variant='contained'
                sx={styles.actionButton}
                size='large'
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
