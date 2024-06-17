import { useEffect, useReducer } from "react";
import { sesionesReducer } from '../pages/Sesiones/sesionesReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('sesiones')) || [];
  }

export const useSesionesEntrenamiento = () => {

    const [sesiones, dispatch] = useReducer(sesionesReducer, [], init);

    useEffect(() => {
        localStorage.setItem('sesiones', JSON.stringify(sesiones))
    }, [sesiones])

    const handleAddSesion = (sesion) => {
        dispatch({ type: '[SESIONES] Add Sesion', payload: sesion })
    }

    const handleDeleteSesion = (id) => {
        dispatch({ type: '[SESIONES] Delete Sesion', payload: id })
    }

    const handleClearSesiones = () => {
        dispatch({ type: '[SESIONES] Clear Sesiones' })
    }

    return {
        sesiones,
        handleAddSesion,
        handleDeleteSesion,
        handleClearSesiones
    }
}