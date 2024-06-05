export const sesionesReducer = ( state, action ) => {

    switch ( action.type ){

        case '[SESIONES] Add Sesion':{
            return [...state, action.payload]
        }
        case '[SESIONES] Delete Sesion':{
            return state.filter( sesion => sesion.id !== action.payload )
        }
    
    }
}