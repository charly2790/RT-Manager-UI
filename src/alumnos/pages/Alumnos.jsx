import "../../styles.css";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
import { buildRequest } from '../../helpers';
import { columns, defaultSort } from "../types";
import { IconButton, Typography } from '@mui/material';
import { LoadingMessage, SimpleTable } from "../../components";
import { methods } from "../../types";
import { ORIGINS } from "../../types";
import { ROLES } from "../../types";
import { subdir } from "../types";
import { useContext } from 'react';
import { useFetch } from "../../hooks";
import { useNavigate } from 'react-router-dom';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export const Alumnos = () => {
    
    const { userLogged:{ idEquipo, token, rol } } = useContext( AuthContext );
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

    const tableSettings = {
        origin: ORIGINS.USUARIOS,
        defaultSort,
        showNewButton: rol === ROLES.TEAM_LEADER ? true : false
      }

    return (
        <div className="flex-drow-jccenter">
            {                
                isLoading
                    ? <LoadingMessage />
                    : <SimpleTable columns={columns} data={alumnosData} tableSettings={tableSettings}/>
            }
        </div>
    )
}
