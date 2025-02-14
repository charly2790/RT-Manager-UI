import React, { useEffect, useState } from 'react'
import { useRandom } from './useRandom'
import _ from 'lodash';
import dayjs from 'dayjs';

export const useAniosToFilter = () => {
  
    const [aniosToFilter, setAniosToFilter] = useState([]);
    const { getEquipoByIdQuery } = useRandom();

    useEffect(() => {        
        if(!getEquipoByIdQuery.isFetching){
            const { fechaFundacion } = getEquipoByIdQuery;
            const aniosResult = [];
            const anioFundacion = dayjs(fechaFundacion).year;
            const anioActual = dayjs().year;
            for(i=anioFundacion; i++; i<= anioActual){
                aniosResult[i]
            }
            if(aniosResult.length>0){
                setAniosToFilter(aniosToFilter);
            }            
        }
    }, [getEquipoByIdQuery.data])
    
  
  return ({
    aniosToFilter,
    isFetching: getEquipoByIdQuery.isFetching
  })
}
