// import React from 'react'
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
// import '../../../styles.css'


export const LoadingMessage = () => {
  return (
    // <Box className="flex-dcol-aicenter width-25">
    //   <CircularProgress size={100}/>
    //   <Typography variant="h5" sx={{ mt: 2, ml: 1 }}>Cargando...</Typography>
    // </Box>
    <Grid container xs={12} direction={'row'} justifyContent={'center'} sx={{ border: '1px dotted red'}}>
      <CircularProgress size={100} />
      <Typography variant="h5" sx={{ mt: 2, ml: 1 }}>Cargando...</Typography>
    </Grid>
  )
}