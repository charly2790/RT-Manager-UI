import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Alumnos } from './pages/Alumnos/Alumnos'
import { Ajustes } from './pages/Ajustes/Ajustes'
import { Carreras } from './pages/Carreras/Carreras'
import { LoginForm } from './pages/Login/LoginForm'
import { Sesiones } from './pages/Sesiones/Sesiones';
import { Dashboard } from './components/Dashboard';
import { CreateSesionForm } from './pages/Sesiones/CreateSesionForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "alumnos",
        element: <Alumnos />,        
      },
      {
        path: "carreras",
        element: <Carreras />,
      },
      {
        path: "ajustes",
        element: <Ajustes />,
      },
      {
        path: "sesiones",
        element: <Sesiones/>,            
      },
      {
        path: "createSesion",
        element: <CreateSesionForm/>
      }
    ]
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  ,
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
