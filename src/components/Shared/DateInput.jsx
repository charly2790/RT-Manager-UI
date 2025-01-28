import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { InputLabel, TextField } from '@mui/material'
import { TIMEZONES } from '../../helpers';
import dayjs from 'dayjs';
import React from 'react'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(TIMEZONES.ARG);


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
        <LocalizationProvider 
            dateAdapter={AdapterDayjs} 
            adapterLocale='es'
            dateLibInstance={dayjs.tz.setDefault(TIMEZONES.ARG)}
            >
            <Controller
                control={control}
                name={name}
                rules={{ required: 'La fecha es requerida' }}
                render={({ field: { onChange, value = defaultValue }, fieldState: { error } }) => {                       
                    let dateValue;
                    try {
                        dateValue = value ? dayjs.tz(value, TIMEZONES.ARG) : null
                    } catch (error) {
                        console.log(error.message);
                        dateValue = dayjs.tz(dayjs(),TIMEZONES.ARG)
                    }

                    return (
                        <>
                            {showInputLabel && <InputLabel id={name} sx={inputLabelStyles}>{label}</InputLabel>}
                            <DatePicker                                
                                disabled={disabled}
                                disableFuture={disableFuture}
                                disablePast={disablePast}
                                format={"DD/MM/YYYY"}
                                value={dateValue}
                                timezone={TIMEZONES.ARG}
                                onChange={(newValue) => {
                                    onChange(newValue ? newValue.tz(TIMEZONES.ARG, true).format() : null);
                                }}
                                sx={styles}
                                renderInput={(params) =>
                                    <TextField                                        
                                        {...params}
                                        disabled={true}
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
