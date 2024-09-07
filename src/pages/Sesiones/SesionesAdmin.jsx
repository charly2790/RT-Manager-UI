// import React, { useContext } from 'react'
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Box, Typography, CssBaseline, Container, ThemeProvider, IconButton, Button } from '@mui/material'
// import { useLocation, useNavigate } from 'react-router-dom';
// import { mainTheme } from '../../themes/mainTheme';
// import { SesionForm } from './components';
// import { SesionesTable } from './components';
// import { constants } from '../../utils/constants';
// import { useSesionesEntrenamiento } from '../../hooks/useSesiones';
// import qs from 'qs';
// import '../../styles.css';
// import Axios from 'axios';
// import { AuthContext } from '../../auth/context';




// const appendButton = (sesiones, handleMethod) => {
//   return sesiones.map((sesion) => (
//     {
//       ...sesion,
//       acciones: (
//         <IconButton aria-label='delete' onClick={() => handleMethod(sesion.id)}>
//           <DeleteIcon />
//         </IconButton>
//       )
//     }
//   ))
// }


// export const SesionesAdmin = () => {

//   const { url } = constants;
  
//   const { state: { alumno } } = useLocation();
//   const { userLogged } = useContext(AuthContext);  
//   const navigate = useNavigate(); 
//   const { sesiones, handleAddSesion, handleDeleteSesion, handleClearSesiones } = useSesionesEntrenamiento();

//   let createSettings = (params) => ({
//     method: 'post',
//     url: `${url}/sesionesEntrenamiento`,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': `Bearer ${userLogged.token}`
//     },
//     data: qs.stringify(params)
//   })  

//   const handleSubmit = async () => {    
    
//     const nuevasSesiones = sesiones.map(({ idSuscripcion, idTipoSesion, Objetivo, fechaSesion }) => {
//       return { 
//         idSuscripcion, 
//         idTipoSesion, 
//         Objetivo, 
//         fechaSesion }
//     })

//     try{
//       const { result } = await Axios.request(createSettings({'sesiones': nuevasSesiones}));
//       localStorage.removeItem('sesiones');
//       navigate("/sesiones", {state: { alumno }})
//       console.log(result);

//     }catch(error){
//       console.error(error.message);      
//     }
//   }

//   return (
//     <>
//       <ThemeProvider theme={mainTheme}>
//         <Container component="main" maxWidth="xl"
//           sx={{
//             width: '100%',
//             // ml: '15%'
//           }}>
//           <CssBaseline />
//           <Box
//             sx={{
//               border: '3px solid green',
//               display: 'flex',
//               justifyContent: 'center',
//             }}
//           >
//             <SesionForm
//               idSuscripcion={alumno.Suscripcions[0].idSuscripcion}
//               handleAddSesion={handleAddSesion}
//               handleDeleteSesion={handleDeleteSesion} />
//             <Box
//               sx={{
//                 // border: '3px solid yellow',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 mt: 10,
//                 width: '50%',
//                 border: '1px dotted red',                
//               }}
//             >
//               <Typography component="h1" variant="h5">Nuevas sesiones</Typography>
//               <SesionesTable data={appendButton(sesiones, handleDeleteSesion)} handleDeleteSesion={handleDeleteSesion} />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 2, mb: 2, width: '90%' }}
//                 onClick={ handleSubmit }
//               >
//                 Guardar
//               </Button>
//             </Box>
//           </Box>

//         </Container>
//       </ThemeProvider>
//     </>
//   )
// }
