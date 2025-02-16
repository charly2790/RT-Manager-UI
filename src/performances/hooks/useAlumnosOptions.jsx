import _ from 'lodash';
import { useEffect, useState } from 'react'
import { useAlumnos } from '../../alumnos/hooks';

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

export const useAlumnosOptions = ({ getValues, reset }) => {

    const { getAlumnosQuery } = useAlumnos();
    const [ alumnosOptions, setAlumnosOptions ] = useState([]);

    
    useEffect(() => {        
        if (!getAlumnosQuery.isFetching) {            
            const options = getAlumnosOptions(getAlumnosQuery.data.usuarios);            
            setAlumnosOptions(options);
            reset({
                ...getValues(),
                ['alumno']: options[0].value
            })
        }
    }, [getAlumnosQuery.data])

    return ({
        alumnosOptions,
        isFetching: getAlumnosQuery.isFetching
    })
}
