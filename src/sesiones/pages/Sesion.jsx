import { AuthContext } from '../../auth';
import { Box, Button, Grid, InputLabel, TextField, ThemeProvider, Typography } from '@mui/material';
import { buildRequest } from '../../helpers';
import { DateInput, SelectInput } from '../../components';
import { mainTheme } from '../../themes/mainTheme';
import { methods } from '../../types';
import { styles } from './styles'
import { subDir } from '../types';
import { useFetch } from '../../hooks';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom'
import React, { useContext, useState } from 'react'

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
          Nueva Sesión de Entrenamiento
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant='h7' disabled={sesionFieldsState}>Fecha de la sesión</Typography>
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
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputLabel id="objetivo">{"Objetivo"}</InputLabel>
            <TextField
              error={errors.objetivo ? true : false}
              multiline
              required
              sx={{ width: '95%' }}
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
          <Grid item xs={12} sm={12}>
            <InputLabel id="comentarios">{"Comentarios"}</InputLabel>
            <TextField
              error={errors.objetivo ? true : false}
              multiline
              required
              sx={{ width: '95%' }}
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
          <Grid container item xs={12}>
            <Grid item xs={12} md={6}>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                sx={{ mt: 3, mb: 2, mr: 8 }} 
                variant="contained" 
                disabled={!sesionFieldsState}
                color="primary"
                onClick={handleComplete}>
                  {"Completar"}
              </Button>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
