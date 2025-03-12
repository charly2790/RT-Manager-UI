import { Box, Button, Divider, Grid, Snackbar, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DateInput, SelectInput } from '../../components'
import { ClearIcon } from '@mui/x-date-pickers'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const FilterForm = ({
    params,
    register,
    control,
    onSubmit,
    setValue,
    getValues,
    styles
}) => {

    const [optionSelected, setOptionSelected] = useState('periodo');    
    const [alumnosOptions, periodos] = params;
    // const [onError, setOnError] = useState(false);

    const handleChange = (event, newOption) => {

        const keysToClear = newOption === 'periodo'
            ? ['fechaDesde', 'fechaHasta']
            : ['periodo'];

        keysToClear.forEach(key => {
            setValue(key, undefined, { shouldValidate: false, shouldDirty: false });
        })

        setOptionSelected(newOption);
    }

     const handleSubmit = (e) => {
        e.preventDefault();
        
        const keysToClear = optionSelected === 'periodo'
        ? ['fechaDesde', 'fechaHasta']
        : ['periodo'];        

        keysToClear.forEach(key => {
            setValue(key, undefined, { shouldValidate: false, shouldDirty: false });
        });
        
        const { alumno, fechaDesde, fechaHasta, periodo } = getValues();        

        if( !(alumno && alumno !== 0) || !( ( fechaDesde && fechaHasta ) || ( periodo && periodo !== 1800))) {
            console.log('por favor completa todos los filtros');            
            return;
        }
        onSubmit();
    }     

    return (
        <Box
            component="form"
            noValidate            
            sx={{ ...styles }}            
        >   
            {/* {
                onError && <Snackbar
                open={open}
                autoHideDuration={2000}                
                message="Hay errores en el formulario"
              />
            } */}            
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
                        options={alumnosOptions}
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
                                options={periodos}
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
                        sx={{ width: '40%', mr: 2 }}
                        startIcon={<ClearIcon />}
                        >
                        Limpiar
                    </Button>
                    <Button
                        variant='contained'
                        size='large'
                        type='submit'
                        color={"primary"}
                        sx={{ width: '40%' }}
                        startIcon={<FilterAltIcon />}
                        onClick={handleSubmit}
                    >
                        Filtrar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
