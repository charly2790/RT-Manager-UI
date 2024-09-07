// import React, { useContext } from 'react'
// import { useFetch } from '../../hooks/useFetch'
// import { useLocation } from 'react-router-dom'
// import { LoadingMessage } from '../../components/Shared/LoadingMessage/LoadingMessage'
// import { SimpleTable } from '../../components/SimpleTable'
// import dayjs from 'dayjs'
// import { constants } from '../../utils/constants'
// import { UserContext } from '../Context/UserContext'

// export const Sesiones = () => {

//   const { userLogged } = useContext(UserContext);  
//   const { state } = useLocation();
//   const { url } = constants;

//   const settings = () => {  
    
//     const alumno = state ? state.alumno : undefined;  

//     return {
//       method: 'get',
//       url: `${url}/sesionesEntrenamiento`,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': `Bearer ${userLogged.token}`
//       },
//       params: {
//         'idSuscripcion': alumno ? alumno.Suscripcions[0].idSuscripcion : userLogged.idSuscripcion
//       }
//     };
//   }

//   const columns = [
//     {
//       header: "Fecha",
//       accessorKey: "fechaSesion",
//     },
//     {
//       header: "Objetivo",
//       accessorKey: "Objetivo",
//     },
//     {
//       header: "Tipo de Sesion",
//       accessorKey: "idTipoSesion",
//     },
//     {
//       header: "Completado?",
//       accessorKey: "completado",
//     }
//   ]

//   const { data, hasError, isLoading } = useFetch(settings());

//   let sesiones = [];

//   if (data) {
//     sesiones = data.map(sesion => {
//       return {
//         fechaSesion: dayjs(sesion.fechaSesion).format("DD-MM-YYYY"),
//         Objetivo: sesion.Objetivo,
//         idTipoSesion: sesion.idTipoSesion,
//         completado: sesion.Completado ? "Si" : "No",
//       }
//     })
//   }

//   const formParams = {
//     route: "/createSesion",
//     params: {      
//       alumno: state ? state.alumno : undefined
//     }
//   }

//   return (
//     <div className="flex-drow-jccenter">
//       {
//         isLoading
//           ? <LoadingMessage />
//           : <SimpleTable columns={columns} data={sesiones} formParams={formParams} />
//       }
//     </div>
//   )
// }
