import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    
    const { logged } = useContext( AuthContext );

    const { pathname, search } = useLocation();

    localStorage.setItem('lastpath', pathname + search );
  
  return ( logged )
    ? children
    : <Navigate to="/login"/>
}
