import { InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

export const SelectInput = ({ register, options, label, name, styles, }) => {
    return (
        <>
            <InputLabel id="Genero">{ label }</InputLabel>
            <Select                                
                {...register(name)}
                label={label}
                placeholder={label}
                sx={styles}
            >
                {
                    options.map(( option )=>{                        
                        return <MenuItem key={option} value={option}>{option}</MenuItem>                        
                    })
                }                
            </Select>
        </>
    )
}
