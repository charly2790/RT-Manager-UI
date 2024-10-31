import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

export const Sesion = () => {

  const { sesionId } = useParams();
  const { state } = useLocation();

  const sesion = state ? state.sesion : undefined;

  return (
    <div>{`El id sesion es ${sesionId}`}</div>
  )
}
