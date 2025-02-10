import React, { useContext } from 'react'
import Axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../auth'
import { buildRequest } from '../helpers'
import { methods } from '../types'
import { subdir } from '../alumnos/types'

const getAlumnos = async ({ idEquipo, token }) => {

    console.log('idEquipo-->', idEquipo);
    console.log('token-->', token);
    console.log('subdir.usuarios-->', subdir.usuarios);
    console.log('methods.get-->', methods.get);

    const params = buildRequest(subdir.usuarios, methods.get, { idEquipo }, token);

    const response = await Axios.request(params);
    
    console.log('response-->', response);

    if (response && response.statusText !== 'OK')
        throw new Error('Error al obtener los alumnos');

    return response.data;

}

export const useRandom = () => {

    const { userLogged } = useContext(AuthContext);

    const getAlumnosQuery = useQuery({
        queryKey: ['getAlumnosQuery'],
        queryFn: () => getAlumnos(userLogged),
        staleTime: 1000 * 15,
    });
    
    return {
        getAlumnosQuery,
    }
}
