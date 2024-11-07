//import { constants } from '../../utils/constants.js'
//import { SimpleTable } from '../../components/SimpleTable';
// import { UserContext } from '../Context/UserContext.jsx';
import "../../styles.css";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
import { buildRequest } from '../../helpers';
import { IconButton, Typography } from '@mui/material';
import { LoadingMessage, SimpleTable } from "../../components";
import { methods } from "../../types";
import { subdir } from "../types";
import { useContext } from 'react';
import { useFetch } from "../../hooks";
import { useNavigate } from 'react-router-dom';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

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
export const Alumnos = () => {
    
    const { userLogged:{ idEquipo, token } } = useContext( AuthContext );
    const navigate = useNavigate();
    let alumnosData = [];
    
    const reqConfigs = buildRequest( subdir.usuarios, methods.get, { idEquipo }, token );    

    const { data, hasError, isLoading } = useFetch( reqConfigs );

    if (data) {

        let { usuarios: alumnos } = data;

        alumnosData = alumnos.map(alumno => {
            return {
                email: alumno.email,
                idSuscripcion: alumno.Suscripcions[0].idSuscripcion,
                idEquipo: alumno.Suscripcions[0].idEquipo,
                Acciones:
                    (<IconButton aria-label="delete" onClick={() => navigate("/sesiones", { state: { alumno } })}>
                        <DirectionsRunIcon />
                    </IconButton>)
            }
        })
    }

    return (
        <div className="flex-drow-jccenter">
            {                
                isLoading
                    ? <LoadingMessage />
                    : <SimpleTable columns={columns} data={alumnosData} />
            }
        </div>
    )
}
