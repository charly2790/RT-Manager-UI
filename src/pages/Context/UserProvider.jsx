import { useState } from "react"
import { UserContext } from "./UserContext"


export const UserProvider = ({ children }) => {
  
    const setUserToken = ( userToken ) => localStorage.setItem('token', userToken);
    const getUserToken = () => localStorage.getItem('token');
    const idEquipo = 1;
      
    return (
    <UserContext.Provider value = {{ setUserToken, getUserToken, idEquipo }}>
        { children }
    </UserContext.Provider>
  )
}
