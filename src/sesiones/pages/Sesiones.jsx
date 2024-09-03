import { AuthContext } from '../../auth/context/AuthContext';
import { buildRequest } from '../../helpers';
import { LoadingMessage, SimpleTable } from '../../components';
import { methods } from '../../types';
import { subDir, columns } from '../types';
import { useContext } from 'react'
import { useFetch } from '../../hooks';
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs';
import { Grid, Typography } from '@mui/material';


export const Sesiones = () => {

  const { userLogged } = useContext(AuthContext);
  const { state } = useLocation();

  const alumno = state ? state.alumno : undefined;

  const idSuscripcion = alumno ? alumno.Suscripcions[0].idSuscripcion : userLogged.idSuscripcion

  const reqConfigs = buildRequest(subDir.sesionesEntrenamiento, methods.get, { idSuscripcion }, userLogged.token);

  const { data, hasError, isLoading } = useFetch(reqConfigs);

  console.log('alumno: ', alumno);


  let sesiones = [];

  if (data) {
    sesiones = data.map(sesion => {
      return {
        fechaSesion: dayjs(sesion.fechaSesion).format("DD-MM-YYYY"),
        Objetivo: sesion.Objetivo,
        idTipoSesion: sesion.idTipoSesion,
        completado: sesion.Completado ? "Si" : "No",
      }
    })
  }

  const formParams = {
    route: "/createSesion",
    params: {
      alumno: state ? state.alumno : undefined
    }
  }


  return (
    <Grid container xs={12}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography variant='h4'>{ alumno? `Sesiones de entrenamiento de ${alumno.email}`: `Mis sesiones de entrenamiento`}</Typography>
        </Grid>
        <Grid item xs={12}>
          {
            isLoading
              ? <LoadingMessage />
              : <SimpleTable columns={columns} data={sesiones} formParams={formParams} />
          }
        </Grid>
      </Grid>
      )
}
