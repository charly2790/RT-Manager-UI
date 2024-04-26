import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { SimpleTable } from '../components/SimpleTable';



export const Alumnos = () => {

  const [alumnos, setAlumnos] = useState([]);

  const columns = [
    {
      header: "email",
      accessorKey: "email",      
    },
    {
      header: "ID Suscripcion",
      accessorKey: "idSuscripcion",      
    },
    {
      header: "ID Equipo",
      accessorKey: "idEquipo",      
    },
  ]

  const useFetch = async () => {

    const token = localStorage.getItem('token');
    // const idEquipo = localStorage.getItem('idEquipo');
    const idEquipo = 1;

    let config = {
      method: 'get',
      url: 'http://localhost:3003/usuarios',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      params: {
        'idEquipo': idEquipo
      }
    }

    let response = undefined;

    try {
      response = await Axios.request(config);
      let { data:{usuarios:alumnos} } = response;       
      let parseData = alumnos.map(alumno => {             
        return {
          email: alumno.email,
          idSuscripcion: alumno.Suscripcions[0].idSuscripcion,
          idEquipo: alumno.Suscripcions[0].idEquipo
        }
      })      
      setAlumnos(parseData);
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }

  }

  useEffect(() => {
    useFetch();
  }, [])

  const buttonStyles = {
    fontSize: 20,
    fontWeight: 700,
    backgroundColor: 'red'
  }

  return (
    <>
      <SimpleTable columns={columns} data={alumnos} />

      
    </>
  )
}
