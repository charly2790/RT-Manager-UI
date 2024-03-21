import React from 'react'
import { Button } from '@mui/material';

export const CustomButton = ({children, color, disabled, size, sx, variant}) => {
  return (
    <Button      
      color = {color}
      disabled = {disabled}
      size = {size}
      variant = {variant}
      sx = {sx}
    >
      {children}
    </Button>    
  )
}