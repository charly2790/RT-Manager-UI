import { Alert, Box, Button, Divider, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { ClearIcon } from '@mui/x-date-pickers'
import { DateInput, SelectInput } from '../../components'
import { feedback } from '../types';
import { useError } from '../hooks';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React, { useState } from 'react'
import dayjs from 'dayjs';


export const FilterForm = ({
    params,    
    control,
    onSubmit,
    setValue,
    getValues,
    styles
}) => {

    const [optionSelected, setOptionSelected] = useState('periodo');    
    const [alumnosOptions, periodos] = params;
    const { onError, setOnError } = useError();
   

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
            setOnError({
                status: true,
                message: feedback.EMPTY_REQUIRED_FIELDS
            });
            return;
        }                
        
        if(dayjs(fechaHasta).diff(dayjs(fechaDesde)) <= 0 ){
            setOnError({
                status: true,
                message: feedback.DTSTART_GREATER_THAN_DTEND
            })
            return;
        }        
        
        if(dayjs(fechaHasta).diff(dayjs(fechaDesde),'day') > 365){
            setOnError({
                status: true,
                message: feedback.PERIOD_GREATER_THAN_ONE_YEAR
            });
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
            <Typography variant='h5' sx={{ fontWeight: 'bold' }} gutterBottom>Filtros</Typography>
            {
                onError.status && <Alert severity="error">{onError.message}</Alert>
            }            
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
