import React from 'react'
import Grid from '@mui/material/Grid';
import { CustomButton } from '../../components/Common/CustomButton';

export const Alumnos = () => {
 
  const buttonStyles = {
    fontSize:20,
    fontWeight: 700,
    backgroundColor: 'red'
  }
  return (
    
    <Grid item xs={8}>
    
      <h1>This is alumnos page</h1>
      
      <CustomButton 
        size="large"
        children={"Prueba"}
        sx={buttonStyles}        
        />
      <CustomButton 
        size="large"
        children={"Web setup"}
        // sx={buttonStyles}
        variant="contained"
        color="primary"
        />
      <CustomButton 
        size="large"
        children={"Prueba"}
        // sx={buttonStyles} 
        variant="outlined"       
        color="secondary"
        />
      
    </Grid>
  )
}
