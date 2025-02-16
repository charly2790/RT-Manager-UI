import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react'
import { AuthContext } from '../../auth'
import { getEquipo } from '../actions';

export const useEquipo = () => {

    const { userLogged } = useContext(AuthContext);

    const getEquipoQuery = useQuery({
        queryKey:["getEquipoQuery"],
        queryFn: () => getEquipo(userLogged),
        staleTime: 1000*60*60*1
    })

  return {
    getEquipoQuery
  }
}
