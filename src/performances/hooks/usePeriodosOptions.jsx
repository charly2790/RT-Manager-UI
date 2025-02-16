import _ from 'lodash';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import { useEquipo } from '../../equipos/hooks';

const getPeriodos = (anioInicio) => {
    const periodos = [];
    const anioActual = dayjs().year();
    for (let i = anioInicio; i <= anioActual; i++) {
        periodos.push({ label: `${i}`, value: i });
    }
    return periodos;
}

export const usePeriodosOptions = ({ getValues, reset }) => {

    const [periodosOptions, setPeriodosOptions] = useState([]);    
    const { getEquipoQuery } = useEquipo();

    useEffect(() => {
        if (!getEquipoQuery.isFetching) {
            const { fechaFundacion } = getEquipoQuery.data;
            const periodosResult = getPeriodos(dayjs(fechaFundacion).year())
            if (periodosResult.length > 0) {
                setPeriodosOptions(periodosResult);
                reset({
                    ...getValues(),
                    ['periodo']: periodosResult[periodosResult.length - 1].value
                })
            }
        }
    }, [getEquipoQuery.data])

    return ({
        periodosOptions,
        isFetching: getEquipoQuery.isFetching
    })
}
