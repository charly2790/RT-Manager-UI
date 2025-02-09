import { InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'
import React from 'react'

export const SelectInput = ({
    control,
    name,
    options,
    styles,
    label,    
    disabled = false,
    showInputLabel = false ,
    inputLabelStyles = {},
    validationRules = {}
    }) => {
    return (
        <>
            {showInputLabel && <InputLabel id={name} sx={{...inputLabelStyles}}>{label}</InputLabel>}
            <Controller
                control={control}
                name={name}
                rules={validationRules}                
                render={({ field:{ value, onChange} }) =>{                    
                    return <Select
                        label={showInputLabel ? '' : label}
                        placeholder={label}
                        sx={styles}                        
                        value = { value }
                        onChange={ onChange }                        
                        disabled={disabled}
                    >
                        {
                            options.map((option) => {
                                return <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
                            })
                        }
                    </Select>

                }
                }
            />

        </>
    )
}
