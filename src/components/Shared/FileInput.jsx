import React from 'react'
import { MuiFileInput } from "mui-file-input";
import { Controller } from 'react-hook-form';
import { InputLabel } from '@mui/material';

export const FileInput = ({ 
    control, 
    label,
    name,
    showInputLabel = false,
    styles,
    inputLabelStyles = {},
}) => {
  return (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
        <>
            {showInputLabel && <InputLabel id={name} sx={inputLabelStyles}>{label}</InputLabel>}
            <MuiFileInput                
              {...field}
              helperText={fieldState.invalid ? "Archivo inválido" : ""}
              error={fieldState.invalid}
              sx={styles}
            />
        </>
        )}
      />
  )
}
