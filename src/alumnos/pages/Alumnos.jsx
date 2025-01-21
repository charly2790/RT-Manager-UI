import "../../styles.css";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
import { buildRequest, convertToLocalTime } from '../../helpers';
import { columns, defaultSort } from "../types";
import { Avatar, IconButton, Typography } from '@mui/material';
import { LoadingMessage, SimpleTable } from "../../components";
import { methods } from "../../types";
import { ORIGINS } from "../../types";
import { ROLES } from "../../types";
import { subdir } from "../types";
import { useContext } from 'react';
import { useFetch } from "../../hooks";
import { useNavigate } from 'react-router-dom';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import _ from "lodash";

export const Alumnos = () => {

    const { userLogged: { idEquipo, token, rol } } = useContext(AuthContext);
    const navigate = useNavigate();
    let alumnosData = [];

    const reqConfigs = buildRequest(subdir.usuarios, methods.get, { idEquipo }, token);

    const { data, hasError, isLoading } = useFetch(reqConfigs);

    if (data) {

        let { usuarios: alumnos } = data;

        alumnosData = alumnos.map(alumno => {

            const { Perfil = null, Suscripcions = null } = alumno;
            const hasProfile = !_.isNil(Perfil);
            const hasSuscription = !_.isNil(Suscripcions);            

            return {
                avatar:
                    (<IconButton sx={{ p: 0 }}>
                        <Avatar 
                            alt={hasProfile && !_.isNil(Perfil.nombreCompleto) ? Perfil.nombreCompleto : alumno.email} 
                            src={hasProfile && !_.isNil(Perfil.avatar) ? Perfil.avatar : "/broken-image.jpg"} />
                    </IconButton>),
                nickname: hasProfile && !_.isNil(Perfil.apodo) ? Perfil.apodo : alumno.email,
                fullname: hasProfile && !_.isNil(Perfil.nombreCompleto) ? Perfil.nombreCompleto : "",
                estado: hasSuscription && Suscripcions[0].activo === true ? "ACTIVO" : "INACTIVO",
                fechaInicio: hasSuscription ? convertToLocalTime(Suscripcions.fechaCreacion).format('DD/MM/YYYY') : "-",                
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
        showNewButton: rol === ROLES.TEAM_LEADER ? true : false,
        noRecordsMessage: "No hay alumnos registrados. Comienza agregando uno nuevo"
    }

    return (
        <div className="flex-drow-jccenter">
            {
                isLoading
                    ? <LoadingMessage />
                    : <SimpleTable columns={columns} data={alumnosData} tableSettings={tableSettings} />
            }
        </div>
    )
}
