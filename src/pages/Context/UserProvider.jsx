import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"


export const UserProvider = ({ children }) => {    
  
  const setUserLogged = (userLogged) => localStorage.setItem('userLogged', JSON.stringify(userLogged));

  const userLogged = JSON.parse(localStorage.getItem('userLogged')) || undefined;

  const idEquipo = 1;

  return (
    <UserContext.Provider value={{ setUserLogged, userLogged, idEquipo }}>
      {children}
    </UserContext.Provider>
  )
}
