import { InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'
import React from 'react'

export const SelectInput = ({
    control,
    name,
    options,
    styles,
    label,
    defaultOption,
    disabled = false,
    showInputLabel = false ,
    inputLabelStyles = {}
    }) => {
    return (
        <>
            {showInputLabel && <InputLabel id={name} sx={inputLabelStyles}>{label}</InputLabel>}
            <Controller
                control={control}
                name={name}
                rules={{ required: 'El género es requerido' }}
                disabled={false}
                render={({ field }) =>
                    <Select
                        label={showInputLabel ? '' : label}
                        placeholder={label}
                        sx={styles}
                        defaultValue={field.value || defaultOption}
                        onChange={(e) => field.onChange(e.target.value)}
                        disabled={disabled}
                    >
                        {
                            options.map((option) => {
                                return <MenuItem key={option} value={option}>{option}</MenuItem>
                            })
                        }
                    </Select>
                }
            />

        </>
    )
}
