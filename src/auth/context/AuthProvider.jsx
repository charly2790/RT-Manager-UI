import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer"
import { buildRequest } from "../../helpers";
import { methods } from "../../types/types";
import { subdir, types } from "../types";
import { useReducer } from "react"
import Axios from "axios";

const init = () => {

    const userLogged = JSON.parse( localStorage.getItem('userLogged'));

    return {
        logged: !!userLogged,
        userLogged: userLogged
    }

}

export const AuthProvider = ({ children }) => {
    
    const [ authState, dispatch ] = useReducer( authReducer, {}, init )

    const handleLogin = async ( params ) => {        
        
        const reqConfigs = buildRequest( subdir.login, methods.post, params);
        
        try {
            const { data: { userLogged }} = await Axios.request( reqConfigs );            
            
            if( userLogged ){
                
                localStorage.setItem('userLogged', JSON.stringify(userLogged));                            
                
                dispatch({
                    type: types.login,
                    payload: userLogged
                })
            }            
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    const handleLogout = () => {
        
        localStorage.removeItem('userLogged');

        dispatch({
            type: types.logout,
        })    
    }


    return (
    <AuthContext.Provider value={{
        ...authState,
        login: handleLogin,
        logout: handleLogout,        
    }}>
        { children }
    </AuthContext.Provider>)
}
