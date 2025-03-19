import React from 'react'
import { useLocation } from 'react-router-dom'
import { origins, titles } from '../types';


export const useOrigin = () => {

    const { pathname } = useLocation();
    
    const origin = pathname.split('/')[1].replace(/-/g,'_').toUpperCase();
    
    const getTitle = () => {        

        let title = ''

        switch(origin){
            case origins.PERFORMANCE_BY_PERIOD:{
                title = titles.ALUMNOS_PERFORMANCE_BY_PERIOD
            }break;
            case origins.PERFORMANCE_BY_WEEK:{
                title = titles.ALUMNOS_PERFORMANCE_BY_WEEK
            }break;
            case origins.PERFORMANCE_SOURCE:{
                title = titles.ALUMNOS_PERFORMANCE_SOURCE
            }break;
        }        

        return title;
    }

  return {
    getTitle,
  }
}
