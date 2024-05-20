import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import { LoadingMessage } from '../../components/Shared/LoadingMessage/LoadingMessage'
import { SimpleTable } from '../../components/SimpleTable'
import dayjs from 'dayjs'
import { CreateSesionForm } from './CreateSesionForm'
import { constants } from '../../utils/constants'

export const Sesiones = () => {

  const { state: { alumno, token } } = useLocation();
  const { url } = constants;

  const settings = {
    method: 'get',
    url:`${url}/sesionesEntrenamiento`,    
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
    params: {
      'idSuscripcion': alumno.Suscripcions[0].idSuscripcion
    }
  }

  const columns = [
    {
      header: "Fecha",
      accessorKey: "fechaSesion",      
    },
    {
      header: "Objetivo",
      accessorKey: "Objetivo",
    },
    {
      header: "Tipo de Sesion",
      accessorKey: "idTipoSesion",
    },
    {
      header: "Completado?",
      accessorKey: "completado",
    }
  ]  

  const { data, hasError, isLoading } = useFetch(settings);
  let sesiones = [];

  if (data) {


    sesiones = data.map(sesion => {      
      return {
        fechaSesion: dayjs(sesion.fechaSesion).format("DD-MM-YYYY"),
        Objetivo: sesion.Objetivo,
        idTipoSesion: sesion.idTipoSesion,
        completado: sesion.Completado? "Si" : "No",
      }
    })
  }

  return (
    <div className="flex-drow-jccenter">
      {
        isLoading
          ? <LoadingMessage />
          : <SimpleTable columns={columns} data={sesiones} createForm={"/createSesion"}/>
      }
    </div>
  )
}
