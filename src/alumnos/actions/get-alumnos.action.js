import { makeRequest } from "../../helpers";
import { methods } from "../../types";
import { subdir } from "../types";


export const getAlumnos = async ({ idEquipo, token }) => {

    const res = await makeRequest(subdir.usuarios, methods.get, { idEquipo }, token); 

    //TODO: Quitar validación por statusText
    if (res && res.statusText !== 'OK'){        
        throw new Error('Error al obtener los alumnos');
    }
    
    return res.data;

}