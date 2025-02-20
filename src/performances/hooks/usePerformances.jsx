import dayjs from 'dayjs';
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../auth'
import { getPerformance } from '../actions';
import _ from 'lodash';

export const usePerformances = (filters) => {
    
    const { userLogged: { idEquipo, idSuscripcion, token } } = useContext(AuthContext);
    let { alumno, periodo, fechaDesde, fechaHasta } = filters;

    console.log('alumno-->',alumno);
    
    if(!_.isNil(periodo)){        
        fechaDesde = dayjs(`${periodo}-01-01`).day(0).toISOString('YYYY-MM-DD');
        fechaHasta = dayjs(`${periodo}-12-31`).day(6).toISOString('YYYY-MM-DD');
    }  

    const getPerformanceQuery = useQuery({
        queryKey:["getPerformanceQuery", idEquipo, alumno, fechaDesde, fechaHasta],
        queryFn: () => getPerformance( idEquipo, alumno, token, fechaDesde, fechaHasta ),
        staleTime: 1000*60*60 // 1 hora
    })

  return (
    getPerformanceQuery
  )
}
