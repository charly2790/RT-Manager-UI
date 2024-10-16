import { InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'
import React from 'react'

export const SelectInput = ({ control, name, options, styles, label, }) => {
    return (
        <>
            <InputLabel id="Genero">{label}</InputLabel>
            <Controller
                control={control}
                name={name}
                rules={{ required: 'El género es requerido' }}
                render={({ field }) =>
                    <Select                        
                        label={label}
                        placeholder={label}
                        sx={styles}
                        defaultValue={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
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
