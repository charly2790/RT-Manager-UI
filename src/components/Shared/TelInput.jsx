import React from 'react'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { Controller } from 'react-hook-form';

export const TelInput = ({ control, countries, name, styles }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ validate: (value) => matchIsValidTel(value, { onlyCountries: countries }) }}
            render={({ field: { ref: fieldRef, value, ...fieldProps }, fieldState }) => (
                <MuiTelInput
                    {
                    ...fieldProps}
                    value={value ?? ''}
                    onlyCountries={countries}
                    defaultCountry='AR'
                    helperText={fieldState.invalid ? "Número telefónico inválido" : ""}
                    error={fieldState.invalid}
                    sx={styles} />
            )
            }

        />
    )
}
