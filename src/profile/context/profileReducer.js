import { types } from "./types"

export const profilesReducer = ( state, action ) => {

    switch( action.type ){
        case types.create:{
            return [
                ...state,
                action.payload
            ]                            
        }
        case types.update:{
            return [
                ...state,
                action.payload
            ]
        }
        
    }
}