import { AuthContext } from '../../auth';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { buildRequest } from '../../helpers';
import { methods } from '../../types';
import { DateInput, SelectInput } from '../../components';
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

  const reqSettings = buildRequest(subDir.tiposSesion, methods.get, {}, userLogged.token);

  const sesion = state ? state.sesion : undefined;

  const { data, hasError, isLoading } = useFetch(reqSettings);
  let tiposSesion = data ? data.tiposSesion : [];

  const onSubmit = handleSubmit((data) => {
    console.log('handle submit')
  })  

  return (
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
        <Grid item xs={12} sm={12}>
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
      </Grid>
    </Box>
  )
}
