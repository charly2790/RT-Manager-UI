import { constants } from "../utils/constants"
import qs from 'qs';

export const buildRequest = (
    subDir,
    method,
    vars,
    token = '',
    contentType = 'application/x-www-form-urlencoded') => {

    const { url } = constants;

    let data = {};
    let params = {};
        
    const headers = {
        'Content-Type': contentType,
        'Authorization': `Bearer ${token}`,
    }

    if (method === 'get') {
        params = { ...vars }
    }

    if (method === 'post' || method === 'put' || method === 'patch') {
        data = contentType === 'application/x-www-form-urlencoded' ? qs.stringify(vars) : vars;
    }

    console.log('data: ', data);


    return {
        method,
        url: `${url}/${subDir}`,
        headers,
        params,
        data,
    }
}