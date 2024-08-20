import { constants } from "../utils/constants"
import qs from 'qs';

export const buildRequest = ( subDir, method, vars, token = '') => {

    const { url } = constants;    
    
    let data = {};
    let params = {};

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${ token }`,
    }

    if(method === 'get'){
        params = { ...vars }
    }

    if(method === 'post'){
        data =  qs.stringify( vars )
    }
        

    return {
        method,
        url: `${url}/${subDir}`,
        headers,        
        params,
        data,
    }
}