import { SimpleTable } from '../../components/SimpleTable';
import { useFetch } from '../../hooks/useFetch';
import { LoadingMessage } from '../../components/Shared/LoadingMessage/LoadingMessage';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import "../../styles.css";
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { constants } from '../../utils/constants.js'




export const Alumnos = () => {
  
  const { url } = constants;
  const token = localStorage.getItem('token');
  const idEquipo = 1; 
  const navigate = useNavigate();  
  let alumnosData = [];
  
  let settings = {
    method: 'get',
    url: `${url}/usuarios`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`
    },
    params: {
      'idEquipo': idEquipo
    }
  }
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
    {
      header: "Acciones",
      accessorKey: "Acciones",
    }
  ] 

  const { data, hasError, isLoading } = useFetch( settings );  
  
  if(data){

    let { usuarios:alumnos}  = data;

    alumnosData = alumnos.map(alumno => {             
      return {
        email: alumno.email,
        idSuscripcion: alumno.Suscripcions[0].idSuscripcion,
        idEquipo: alumno.Suscripcions[0].idEquipo,        
        Acciones: 
          (<IconButton aria-label="delete" onClick={() => navigate("/sesiones", {state: { alumno, token }})}>
            <DirectionsRunIcon/>
          </IconButton>)
      }
    })    
  }

  return (
    <div className="flex-drow-jccenter m-open width-100">
       {
       isLoading
        ? <LoadingMessage/>
        :<SimpleTable columns={columns} data={alumnosData} />
      // <LoadingMessage/>
      }            
    </div>
  )
}
