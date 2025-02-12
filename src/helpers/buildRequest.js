import { constants } from "../utils/constants"
import qs from 'qs';
import Axios from 'axios';

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

    return {
        method,
        url: `${url}/${subDir}`,
        headers,
        params,
        data,
    }
}

export const makeRequest = async (
    subDir,
    method,
    vars,
    token = '',
    contentType = 'application/x-www-form-urlencoded'
) => {
    
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

    const settings = {
        method,
        url: `${url}/${subDir}`,
        headers,
        params,
        data,
    }

    return await Axios.request(settings);
}