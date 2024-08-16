import { constants } from "../utils/constants"
import qs from 'qs';

export const buildRequest = ( subDir, method, params ) => {

    const { url } = constants;

    return {
        method: method,
        url: `${url}/${subDir}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(params)
    }
}