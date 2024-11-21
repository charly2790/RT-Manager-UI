import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller } from 'react-hook-form'
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers'
import { InputAdornment, InputLabel, TextField } from '@mui/material'
import dayjs from 'dayjs';
import React from 'react'

export const TimeInput = ({ 
    control, 
    defaultValue, 
    disabled = false,     
    label, 
    name, 
    showInputLabel = false,
    styles, 
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Controller
                control={control}                
                name={name}
                rules={{ required: 'El tiempo total es requerido' }}
                render={({ field: { onChange, value = defaultValue }, fieldState: { error } }) => {
                    const dateValue = value ? dayjs.utc(value) : null

                    return (
                        <>
                            {showInputLabel && <InputLabel id={name} sx={{ mt: 2 }}>{label}</InputLabel>}
                            <TimeField
                                defaultValue={dateValue}
                                disabled={disabled}
                                format='HH:mm:ss'
                                label={showInputLabel ? '' : label}
                                onChange={onChange}
                                sx={styles}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">hh:mm:ss</InputAdornment>,
                                  }}
                            />
                        </>
                    )
                }}
            />
        </LocalizationProvider>
    )
}
