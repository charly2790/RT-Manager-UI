import React, { useEffect, useState } from 'react'
import Axios from 'axios'


export const useFetch = (settings) => {
  
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        errorMessage: ''
    });    

    const getResponse = async ( settings ) => {
        
        let response;

        // await new Promise( resolve => setTimeout(resolve, 1500) );
                
        try {            
            response = await Axios.request(settings);                      
        } catch (error) {
            console.log(error.message)
        }
        
        
        if(response.statusText !== 'OK'){
            setState({
                data:null,
                isLoading: false,
                hasError: true,
                error:{
                    error: response.status,
                    errorMessage: response.statusText
                }
            })
        }        
        const { data } = response;        

        setState({
            data,
            isLoading: false,
            hasError: false,
            errorMessage: null
        })
    }

    useEffect(() => {        
        getResponse( settings );
    }, [])
      
    return ({
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    })
}
