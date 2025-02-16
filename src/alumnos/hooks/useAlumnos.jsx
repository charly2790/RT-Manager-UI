import { useQuery } from '@tanstack/react-query'
import { getAlumnos } from '../actions'
import { useContext } from 'react';
import { AuthContext } from '../../auth';


export const useAlumnos = () => {

    const { userLogged } = useContext(AuthContext);

    const getAlumnosQuery = useQuery({
        queryKey:["getAlumnosQuery"],
        queryFn: () => getAlumnos(userLogged),
        staleTime: 1000*60*60 //1 hora
    })

  return {
    getAlumnosQuery
  }
}
