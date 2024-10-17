import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import dayjs from 'dayjs';
import React from 'react'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

export const DateInput = ({ control, name, label, disableFuture = false, disablePast = false, styles }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Controller
                control={control}
                name={name}
                rules={{ required: 'La fecha es requerida' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => {                    
                    const dateValue = value ? dayjs.utc(value) : null

                    return (
                        <DatePicker
                            label={label}
                            disableFuture={disableFuture}
                            disablePast={disablePast}
                            value={dateValue}                            
                            onChange={(newValue) => {
                                onChange(newValue ? newValue.utc().format():null);
                            }}
                            sx={styles}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    fullWidth
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />}
                        />
                    )
                }}
            />
        </LocalizationProvider>
    )
}
