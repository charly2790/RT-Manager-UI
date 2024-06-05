import React from 'react'
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import { constants } from '../../utils/constants';
import { useFetch } from '../../hooks/useFetch';
import { useForm, Controller } from "react-hook-form";
import { LoadingMessage } from '../../components/Shared/LoadingMessage/LoadingMessage';
import { Box, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Button, IconButton } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const SesionForm = ({ idSuscripcion, handleAddSesion, handleDeleteSesion }) => {

    const { url } = constants;
    const token = localStorage.getItem('token');

    let settings = {
        method: 'get',
        url: `${url}/tiposSesion`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    }    

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        defaultValues: {
            fechaSesion: dayjs(),
        }
    });

    const { data, hasError, isLoading } = useFetch(settings);

    let tiposSesion = data ? data.tiposSesion : [];


    const onSubmit = handleSubmit((data) => {

        let { idTipoSesion, Objetivo, fechaSesion } = data;        

        fechaSesion = dayjs(fechaSesion).format('YYYY-MM-DD');

        let id = new Date().getTime();

        let newSesion = {
            id,
            idSuscripcion,
            idTipoSesion,
            Objetivo,
            fechaSesion,
            acciones: (<IconButton aria-label='delete' onClick={() => handleDeleteSesion(id)}>
                <DeleteIcon />
            </IconButton>)
        }

        handleAddSesion(newSesion);

    })

    return (
        <>
            <Box sx={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '50%',
            }}>
                <Typography component="h1" variant="h5">
                    Nueva Sesión de Entrenamiento
                </Typography>
                {
                    isLoading ? <LoadingMessage />
                        : <Box
                            component="form"
                            noValidate
                            sx={{ mt: 3 }}
                            onSubmit={onSubmit}
                        >
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={errors.tipoSesion ? true : false}
                                    >
                                        <InputLabel
                                            id="select-tipo-sesion"
                                            sx={{ mt: 1 }}
                                        >Tipo Sesión</InputLabel>
                                        <Select
                                            label="Tipo Sesión"
                                            {...register("idTipoSesion")}
                                            defaultValue={tiposSesion.length > 0 && tiposSesion ? tiposSesion[0].idTipoSesion : ""}
                                            labelId="tipoSesion"
                                            id="tipoSesion"
                                            sx={{ mt: 1 }}
                                        >
                                            {
                                                tiposSesion.map((tipo) => {
                                                    return <MenuItem value={tipo.idTipoSesion} key={tipo.idTipoSesion}>{tipo.descripcion}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <Controller
                                            control={control}
                                            name="fechaSesion"
                                            rules={{ required: 'La fecha es requerida' }}
                                            render={({ field: { onChange, value, defaultValue }, fieldState: { error } }) => (
                                                <DatePicker
                                                    label="Fecha de la sesión"
                                                    disablePast
                                                    value={value}
                                                    onChange={onChange}
                                                    sx={{ width: '100%', mt: 1 }}
                                                    renderInput={(params) =>
                                                        <TextField
                                                            {...params}
                                                            fullWidth
                                                        />}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        error={errors.objetivo ? true : false}
                                        multiline
                                        required
                                        fullWidth
                                        rows={2}
                                        id="objetivo"
                                        label="Objetivo"
                                        name="objetivo"
                                        autoComplete="family-name"
                                        {...register("Objetivo", {
                                            required: {
                                                value: true,
                                                message: 'El objetivo es requerido'
                                            },
                                            minLength: {
                                                value: 3,
                                                message: 'Debe contener al menos 3 caracteres'
                                            }
                                        })}
                                        helperText={errors.Objetivo ? errors.Objetivo.message : null}
                                    />
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            multiline
                                            rows={2}
                                            required
                                            fullWidth
                                            id="comentarios"
                                            label="Comentarios"
                                            name="comentarios"
                                            autoComplete="family-name"
                                            sx={{ mt: 2 }}
                                            {...register("comentarios")}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}                                
                            >
                                Agregar
                            </Button>
                        </Box>
                }
            </Box>



        </>
    )
}
