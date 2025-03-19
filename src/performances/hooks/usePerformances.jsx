import dayjs from 'dayjs';
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../auth'
import { getPerformance } from '../actions';
import _ from 'lodash';
import weekday from "dayjs/plugin/weekday.js"
import isoWeek from "dayjs/plugin/isoWeek.js"

dayjs.extend(weekday);
dayjs.extend(isoWeek);

export const usePerformances = (filters) => {    
             
    let { alumno, periodo, fechaDesde = undefined , fechaHasta = undefined } = filters;    
    
    const { userLogged: { idEquipo, idSuscripcion, token } } = useContext(AuthContext);
    
    if(!_.isNil(periodo)){        
      
        const firstDayOfYear = dayjs(`${periodo}-01-01`);
        const lastDayOfYear = dayjs(`${periodo}-12-31`);        

        let isoWeek1stDayOfYear = firstDayOfYear.isoWeekYear();
        let isoWeekLastDayOfYear = lastDayOfYear.isoWeekYear();

        if(isoWeek1stDayOfYear === periodo ){
          fechaDesde = firstDayOfYear.isoWeekday(1).toISOString('YYYY-MM-DD');
        }else{
          fechaDesde = firstDayOfYear.add(1,'week').isoWeekday(1).toISOString('YYYY-MM-DD');
        }

        if(isoWeekLastDayOfYear === periodo ){
          fechaHasta = lastDayOfYear.isoWeekday(7).toISOString('YYYY-MM-DD');
        }else{
          fechaHasta = lastDayOfYear.subtract(1,'week').isoWeekday(7).toISOString('YYYY-MM-DD');
        }
                
    }
    
    const getPerformanceQuery = useQuery({
        queryKey:["getPerformanceQuery", idEquipo, alumno, fechaDesde, fechaHasta],
        queryFn: () => getPerformance( idEquipo, alumno, token, fechaDesde, fechaHasta ),
        staleTime: 1000*60*60
    })
    const getPerformanceByWeek = useQuery({
      queryKey:["getPerformanceByWeekQuery", idEquipo, alumno, fechaDesde, fechaHasta],
      queryFn: () => getPerformanceByWeek( idEquipo, alumno, fechaDesde, fechaHasta ),
      staleTime: 1000*60*60
    })

  return {
    getPerformanceQuery,
    getPerformanceByWeek,
  }
}