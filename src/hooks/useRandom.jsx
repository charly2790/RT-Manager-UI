import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../auth'
import { makeRequest } from '../helpers'
import { methods } from '../types'
import { subdir } from '../alumnos/types'

const getAlumnos = async ({ idEquipo, token }) => {

    const response = await makeRequest(subdir.usuarios, methods.get, { idEquipo }, token);

    if (response && response.statusText !== 'OK')
        throw new Error('Error al obtener los alumnos');
    return response.data;

}

export const useRandom = () => {

    const { userLogged } = useContext(AuthContext);

    const getAlumnosQuery = useQuery({
        queryKey: ['getAlumnosQuery'],
        queryFn: () => getAlumnos(userLogged),
        staleTime: 1000 * 60 * 60,
    });
    
    return {
        getAlumnosQuery,
    }
}
