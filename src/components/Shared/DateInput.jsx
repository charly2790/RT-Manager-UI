import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import React from 'react'

export const DateInput = ({ control, name, label, disableFuture = false, disablePast = false, styles }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Controller
                control={control}
                name={name}
                rules={{ required: 'La fecha es requerida' }}
                render={({ field: { onChange, value, defaultValue }, fieldState: { error } }) => (
                    <DatePicker
                        label={label}
                        disableFuture={disableFuture}
                        disablePast={disablePast}
                        value={value}
                        onChange={onChange}
                        sx={styles}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                fullWidth
                            />}
                    />
                )}
            />
        </LocalizationProvider>
    )
}
