import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../auth'
import { makeRequest } from '../helpers'
import { methods } from '../types'
import { subdir as ALUMNO_ROUTES} from '../alumnos/types'
import { subdir as EQUIPO_ROUTES} from '../equipos/types'
import _ from 'lodash'

const getAlumnos = async ({ idEquipo, token }) => {

    const response = await makeRequest(ALUMNO_ROUTES.usuarios, methods.get, { idEquipo }, token);    

    if (response && response.statusText !== 'OK')
        throw new Error('Error al obtener los alumnos');
    return response.data;

}

const getEquipoById = async ({idEquipo, token }) => {
    
    const res = await makeRequest(`${EQUIPO_ROUTES.equipos}/${idEquipo}`, methods.get, null , token);

    if( res.status !== 200 || (_.isNil(res.data) && _.isNil(res.data.result))) throw new Error('Error al recuperar datos de equipo');

    const { data : { result : equipo }} = res;
    
    return equipo;
}

export const useRandom = () => {

    const { userLogged } = useContext(AuthContext);

    const getAlumnosQuery = useQuery({
        queryKey: ['getAlumnosQuery'],
        queryFn: () => getAlumnos(userLogged),
        staleTime: 1000 * 60 * 60 // 1 hora
    });

    const getEquipoByIdQuery = useQuery({
        queryKey: ['getEquipoById'],
        queryFn: () => getEquipoById(userLogged),
        staleTime: 1000 * 60 * 60 * 2 //2 horas
    })
    
    return {
        getAlumnosQuery,
        getEquipoByIdQuery
    }
}
