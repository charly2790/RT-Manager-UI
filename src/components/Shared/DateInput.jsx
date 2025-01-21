import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { InputLabel, TextField } from '@mui/material'
import dayjs from 'dayjs';
import React from 'react'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)



export const DateInput = ({ 
    control, 
    defaultValue, 
    disabled = false, 
    disableFuture = false, 
    disablePast = false, 
    label, 
    name, 
    showInputLabel = false,
    styles,
    inputLabelStyles = {}
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Controller
                control={control}                
                name={name}
                rules={{ required: 'La fecha es requerida' }}
                render={({ field: { onChange, value = defaultValue }, fieldState: { error } }) => {
                    const dateValue = value ? dayjs.utc(value) : null

                    return (
                        <>
                            {showInputLabel && <InputLabel id={name} sx={inputLabelStyles}>{label}</InputLabel>}
                            <DatePicker
                                label={label}
                                disabled={disabled}
                                disableFuture={disableFuture}
                                disablePast={disablePast}
                                format={"DD/MM/YYYY"}
                                value={dateValue}
                                onChange={(newValue) => {
                                    onChange(newValue ? newValue.utc().format() : null);
                                }}
                                sx={styles}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        fullWidth
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        size={'small'}
                                    />}
                            />
                        </>
                    )
                }}
            />
        </LocalizationProvider>
    )
}
