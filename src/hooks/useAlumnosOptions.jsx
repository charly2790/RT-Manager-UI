import React, { useEffect, useState } from 'react'
import { useRandom } from './useRandom';
import _ from 'lodash';

const getAlumnosOptions = (alumnosData) => {

    if (alumnosData.length === 0) return [];

    return alumnosData.map(alumno => {

        const label = _.isNil(alumno.Perfil) ? alumno.email : alumno.Perfil.apodo;
        const value = _.isNil(alumno.suscripciones) ? 99 : alumno.suscripciones[0].idSuscripcion

        return {
            label,
            value
        }
    })

}

export const useAlumnosOptions = () => {

    const { getAlumnosQuery } = useRandom();
    const [alumnosOptions, setAlumnosOptions] = useState([]);

    useEffect(() => {
        if (!getAlumnosQuery.isFetching) {
            const options = getAlumnosOptions(getAlumnosQuery.data.usuarios);
            setAlumnosOptions(options);      
        }
    }, [getAlumnosQuery.data])

    return ({
        alumnosOptions,
        isFetching: getAlumnosQuery.isFetching
    })
}
