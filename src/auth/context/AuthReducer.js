import { types } from "../types/types"

export const authReducer = ( state = {}, action ) => {    
    
    switch ( action.type ) {
        case types.login:
            return {
                ...state,
                logged: true,
                userLogged: action.payload
            }            
        case types.logout:
            return {
                logged: false,
            }
        case types.updateUserLoggedData:
            return {
                ...state,
                userLogged: action.payload
            }
        default:
            return state;
    }

}