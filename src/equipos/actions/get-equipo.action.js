import _ from "lodash";
import { makeRequest } from "../../helpers";
import { methods } from "../../types";
import { subdir } from "../types";

export const getEquipo = async ({ idEquipo, token }) => {
        
    const res = await makeRequest(`${subdir.equipos}/${idEquipo}`, methods.get, null , token);

    if( res.status !== 200 || (_.isNil(res.data) && _.isNil(res.data.result))) throw new Error('Error al recuperar datos de equipo');

    const { data : { result : equipo }} = res;    
    
    return equipo;
}