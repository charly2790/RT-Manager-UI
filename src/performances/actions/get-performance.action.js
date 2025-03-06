import React from 'react'
import { subdir } from '../types/subDirs';
import { methods } from '../../types';
import { makeRequest } from '../../helpers';
import _ from 'lodash';

export const getPerformance = async (
  idEquipo,
  alumno,
  token,
  fechaDesde, 
  fechaHasta,    
) => {
  
  if ( _.isNil(alumno) || alumno === 0) return {};

  const res = await makeRequest(
    `${subdir.performances}/${alumno}`, 
    methods.get, 
    { idEquipo, fechaDesde, fechaHasta },
    token
  )  

  if( _.isNil(res) || _.isNil(res.data)) throw new Error('Ocurrio algun error al hacer la petición');

  const { result } = res.data;
          
  return result;
  }