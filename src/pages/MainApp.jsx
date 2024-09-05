// import {
//     RouterProvider,
//     createBrowserRouter,  
//   } from "react-router-dom";
//   import { Alumnos, Sesiones, Ajustes, Carreras, LoginForm, Dashboard, SesionesAdmin } from './index';
//   import { UserProvider } from "./Context/UserProvider";
  
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Dashboard />,
//       children: [
//         {
//           path: "alumnos",
//           element: <Alumnos />,        
//         },
//         {
//           path: "carreras",
//           element: <Carreras />,
//         },
//         {
//           path: "ajustes",
//           element: <Ajustes />,
//         },
//         {
//           path:"Planificación",
//           element: <Sesiones/>
//         },
//         {
//           path: "sesiones",
//           element: <Sesiones/>,            
//         },
//         {
//           path: "createSesion",
//           element: <SesionesAdmin/>
//         }
//       ]
//     },
//     {
//       path: "login",
//       element: <LoginForm />,
//     },
//     ,
//   ]);
  
//   export const MainApp = () => {
//     return (    
//         <UserProvider>
//             <RouterProvider router={ router }/>        
//         </UserProvider>    
//     )
//   }
  