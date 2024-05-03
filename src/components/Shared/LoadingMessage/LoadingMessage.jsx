import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import '../../../styles.css'


export const LoadingMessage = () => {
  return (
    <Box className="flex-dcol-aicenter width-25">
      <CircularProgress size={100}/>
      <Typography variant="h5" sx={{ mt: 2, ml: 1 }}>Cargando...</Typography>
    </Box>
  )
}
