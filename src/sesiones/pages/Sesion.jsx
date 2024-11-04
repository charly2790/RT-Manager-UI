import { AuthContext } from '../../auth';
import { Box, Grid } from '@mui/material';
import { buildRequest } from '../../helpers';
import { methods } from '../../types';
import { SelectInput } from '../../components';
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
  const [ sesionFieldsState, setSesionFieldsState ] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    control,
    setValue
  } = useForm()

  const reqSettings = buildRequest( subDir.tiposSesion, methods.get, { }, userLogged.token );

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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SelectInput
            control={control}
            name="idTipoSesion"
            options={tiposSesion.map(tipo => tipo.descripcion)}
            styles={styles.textfield}
            label="Tipo de sesión"
            defaultOption={sesion ? sesion.TipoSesion.descripcion : ''}
            disabled = {sesionFieldsState}
          />
        </Grid>
      </Grid>

    </Box>
  )
}
