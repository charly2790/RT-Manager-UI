import { Box, Button, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DateInput, SelectInput } from '../../components'
import { ClearIcon } from '@mui/x-date-pickers'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const FilterForm = ({
    register,
    control,
    onSubmit,
    styles
}) => {

    const [optionSelected, setOptionSelected] = useState('web');

    const handleChange = (event, newOption) => {
        setOptionSelected(newOption);
    }

    return (
        <Box
            component="form"
            noValidate
            onSubmit={onSubmit}
            sx={{ ...styles }}
        >
            <Typography variant='h5' sx={{ fontWeight: 'bold' }} gutterBottom>Filtros</Typography>
            <Divider />
            <Grid container spacing={2} alignItems="flex-start" sx={{ padding: "5% 0 0 0" }}>
                <Grid item xs={12}>
                    <SelectInput
                        control={control}
                        name="alumno"
                        label="Alumno"
                        showInputLabel={true}
                        styles={{ width: '100%' }}
                        inputLabelStyles={{ fontWeight: 'bold' }}
                        options={[
                            { value: 'Carlos Barrionuevo', label: 'Carlos Barrionuevo' },
                            { value: 'Rosana Garcia', label: 'Rosana Garcia' },
                            { value: 'Florencia Martinez', label: 'Florencia Martinez' },
                            { value: 'Alejandra Lanfranconi', label: 'Alejandra Lanfranconi' }
                        ]}
                    />
                </Grid>
                <Grid container item xs={12} sx={{ justifyContent: 'center', mt: 4, mb: 2 }}>
                    <ToggleButtonGroup
                        color='primary'
                        value={optionSelected}
                        exclusive
                        onChange={handleChange}
                        aria-label='Platform'
                    >
                        <ToggleButton value="periodo">Periodo</ToggleButton>
                        <ToggleButton value="fecha">Fecha</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>

                {
                    optionSelected === 'periodo'
                        ? <Grid item xs={12}>
                            <SelectInput
                                control={control}
                                name="periodo"
                                label="Periodo"
                                showInputLabel={true}
                                styles={{ width: '100%' }}
                                inputLabelStyles={{ fontWeight: 'bold' }}
                                options={[
                                    { value: 2023, label: '2023' },
                                    { value: 2024, label: '2024' },
                                    { value: 2025, label: '2025' },
                                ]}
                            />
                        </Grid>
                        : <>
                            <Grid item xs={12} md={6} sx={{ padding: "0 0 0 0" }}>
                                <DateInput
                                    control={control}
                                    label="Desde"
                                    name="fechaDesde"
                                    showInputLabel={true}
                                    inputLabelStyles={{ fontWeight: 'bold' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} sx={{ padding: "0 0 0 0" }}>
                                <DateInput
                                    control={control}
                                    label="Hasta"
                                    name="fechaHasta"
                                    showInputLabel={true}
                                    inputLabelStyles={{ fontWeight: 'bold' }}
                                />
                            </Grid>
                        </>
                }

                <Grid container item xs={12} sx={{ justifyContent: 'flex-end', mt: 2 }}>                    
                        <Button
                            variant='contained'
                            size='large'                            
                            color='primary'
                            sx={{width: '40%', mr: 2}}
                            startIcon={<ClearIcon />}
                        >
                            Limpiar
                        </Button>                                        
                        <Button
                            variant='contained'
                            size='large'
                            type='submit'
                            color={"primary"}
                            sx={{width: '40%'}}
                            startIcon={<FilterAltIcon/>}
                        >
                            Filtrar
                        </Button>                    
                </Grid>
            </Grid>
        </Box>
    )
}
