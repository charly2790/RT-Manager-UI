import _ from 'lodash';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import { useRandom } from './useRandom'

const getPeriodos = (anioInicio) => {
    const periodos = [];
    const anioActual = dayjs().year();
    for (let i = anioInicio; i <= anioActual; i++) {
        periodos.push({ label: `${i}`, value: i });
    }
    return periodos;
}

export const usePeriodos = () => {

    const [periodos, setPeriodos] = useState([]);
    const { getEquipoByIdQuery } = useRandom();

    useEffect(() => {
        if (!getEquipoByIdQuery.isFetching) {            
            const { fechaFundacion } = getEquipoByIdQuery.data;            
            const periodosResult = getPeriodos(dayjs(fechaFundacion).year());
            if (periodosResult.length > 0) {
                setPeriodos(periodosResult);
            }
        }
    }, [getEquipoByIdQuery.data])


    return ({
        periodos,
        isFetching: getEquipoByIdQuery.isFetching
    })
}
