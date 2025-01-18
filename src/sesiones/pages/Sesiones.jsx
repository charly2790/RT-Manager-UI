import { AuthContext } from '../../auth/context/AuthContext';
import { buildRequest, convertToUtcTime } from '../../helpers';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { LoadingMessage, SimpleTable } from '../../components';
import { methods, ROLES } from '../../types';
import { ORIGINS } from '../../types';
import { subDir, columns, defaultSort } from '../types';
import { useContext } from 'react'
import { useFetch } from '../../hooks';
import { useLocation, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
import DoneIcon from '@mui/icons-material/Done';


export const Sesiones = () => {

  const { userLogged : { idSuscripcion: idSusc, token, rol } } = useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const alumno = state ? state.alumno : undefined;

  const idSuscripcion = alumno ? alumno.Suscripcions[0].idSuscripcion : idSusc;

  const reqConfigs = buildRequest(subDir.sesionesEntrenamiento, methods.get, { idSuscripcion }, token);

  const { data, hasError, isLoading } = useFetch(reqConfigs);

  let sesiones = [];  

  if (data) {    
    sesiones = data.map(sesion => {

      let {      
        Entrenamiento,   
        EstadoSesion, 
        fechaSesion,         
        Objetivo,
        TipoSesion, 
      } = sesion;
      return {        
        estado: EstadoSesion.descripcion,        
        fechaSesion: convertToUtcTime(fechaSesion).format("DD-MM-YYYY"),        
        Objetivo: Objetivo,
        tipo: TipoSesion.descripcion,
        acciones:
          (
            <Tooltip title="Completar sesión">
              <IconButton aria-label="complete" onClick={() => navigate(`/sesiones/${sesion.idSesion}`, { state: { sesion } })}>
                <DoneIcon />
              </IconButton>
            </Tooltip>
          )
      }
    })
  }

  const formParams = {
    route: "/sesiones-admin",
    params: {
      alumno: state ? state.alumno : undefined
    }
  }
  
  const tableSettings = {
    origin: ORIGINS.SESIONES,
    defaultSort,
    showNewButton: rol === ROLES.TEAM_LEADER ? true : false
  }

  let nickname = "";
  
  if(alumno){    
    const { Perfil } = alumno;
    if(Perfil){
      nickname = Perfil.apodo.charAt(0).toUpperCase() + Perfil.apodo.slice(1).toLowerCase();
    }else{
      nickname = alumno.email;
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant='h4'>{alumno ? `Sesiones de ${nickname}` : `Mis sesiones de entrenamiento`}</Typography>
      </Grid>
      <Grid item xs={12}>
        {
          isLoading
            ? <LoadingMessage />
            : <SimpleTable 
                columns={columns} 
                data={sesiones} 
                formParams={formParams} 
                origin={ORIGINS.SESIONES}
                defaultSort={defaultSort}
                tableSettings={tableSettings}
                />
        }
      </Grid>
    </Grid>
  )
}
