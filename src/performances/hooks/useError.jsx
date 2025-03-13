import React, { useEffect, useState } from 'react'

export const useError = () => {

    const [onError, setOnError] = useState({
        status: false,
        message: ''
    });

    useEffect(() => {
        
        if( !onError.status ) return;
        
        const timer = setTimeout(() => {
            setOnError({ status: false, message: ''})
        }, 5000);

        return () => clearTimeout(timer);

    }, [onError.status])


    return ({
        onError,
        setOnError,        
    })
}
