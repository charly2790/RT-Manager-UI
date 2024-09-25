import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Avatar, Box, Button, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Description, Edit, Facebook, Instagram, Save, X } from '@mui/icons-material'
import { MuiTelInput } from 'mui-tel-input';
import { styles } from './styles'
import { useForm, Controller } from 'react-hook-form';
import React, { useState } from 'react'
import dayjs from 'dayjs';


const redesSociales = [
  {
    nombre: 'Facebook',
    icono: <Facebook />
  },
  {
    nombre: 'Instagram',
    icono: <Instagram />
  },
  {
    nombre: 'X',
    icono: <X />
  },
]


export const Profile = () => {

  const [phone, setPhone] = useState('')

  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    let { nombre, apellido, apodo, fechaNacimiento } = data;

    fechaNacimiento = dayjs(fechaNacimiento).format('YYYY-MM-DD');

    console.log('nombre: ', nombre);
    console.log('apellido: ', apellido);
    console.log('apodo: ', apodo);

    console.log('fechaNacimiento: ', fechaNacimiento);
  })


  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
      >

        <Grid container sx={{ mb: 16 }}>
          <Grid container item xs={12}>
            <Grid item xs={5}>
              <Typography variant='h4' sx={{ mt: 2, mb: 2 }}>
                Mi perfil
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton aria-label="delete" size='large' sx={{ mt: 1 }} color='primary'>
                <Description />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container item xs={12} position={'relative'}>
            <Avatar
              alt="Profile Picture"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              sx={styles.avatar}
            />
            <IconButton
              aria-label="upload new picture"
              size="sm"
              variant="outlined"
              color="neutral"
              sx={styles.iconButton}
            >
              <Edit sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
            </IconButton>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sx={styles.gridFormItem}>
              <Typography variant='h6'>Datos personales</Typography>
            </Grid>
            <Grid item xs={12} sx={{ pt: 1 }}>
              <Divider />
            </Grid>
            <Grid item xs={12} sx={styles.gridFormItem}>
              <TextField
                variant="filled"
                label="nombre"
                size='small'
                sx={styles.textfield}
                {...register("nombre", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sx={styles.gridFormItem}>
              <TextField
                variant="filled"
                label="apellido"
                size='small'
                sx={styles.textfield}
                {...register("apellido", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sx={styles.gridFormItem}>
              <TextField
                variant="filled"
                label="apodo"
                size='small'
                sx={styles.textfield}
                {...register("apodo", { required: true })}
              />
            </Grid>
            <Grid item xs={12} sx={styles.gridFormItem}>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  name="fechaNacimiento"
                  rules={{ required: 'La fecha de nacimiento es requerida' }}
                  render={({ field: { onChange, value, defaultValue }, fieldState: { error } }) => {
                    <DemoContainer components={['DatePicker']} sx={styles.textfield}>
                      <DatePicker 
                        variant="filled" 
                        label="Fecha de nacimiento" 
                        onChange={onChange}
                        renderInput = {(params) => <TextField {...params} fullWidth />}
                        />
                    </DemoContainer>
                  }}
                >

                </Controller>
              </LocalizationProvider> */}
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Controller
                  control={control}
                  name="fechaNacimiento"
                  rules={{ required: 'La fecha es requerida' }}
                  render={({ field: { onChange, value, defaultValue }, fieldState: { error } }) => (
                    <DatePicker
                      label="Fecha de nacimiento"
                      disableFuture                      
                      value={value}
                      onChange={onChange}
                      sx={styles.textfield}                      
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
            <Grid item xs={12} sx={styles.gridFormItem}>
              <InputLabel id="tel">Teléfono</InputLabel>
              <MuiTelInput value={phone} onChange={handleChange} defaultCountry='AR' sx={styles.textfield} />
            </Grid>
            <Grid item xs={12} sx={styles.gridFormItem}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="Genero">Género</InputLabel>
                <Select
                  labelId="genero"
                  id="genero"
                  // value={age}
                  label="Genero"
                  placeholder='Genero'
                  // onChange={handleChange}
                  sx={styles.textfield}
                >
                  <MenuItem value={'Femenino'}>Femenino</MenuItem>
                  <MenuItem value={'Masculino'}>Masculino</MenuItem>
                  <MenuItem value={'Otro'}>Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={styles.gridFormItem}>
              <Typography variant='h6'>Redes Sociales</Typography>
            </Grid>
            <Grid item xs={12} sx={{ pt: 1 }}>
              <Divider />
            </Grid>
            {
              redesSociales.map((red, index) => {
                return <Grid item xs={12} key={index} sx={styles.gridFormItem}>
                  <TextField
                    variant="filled"
                    label={red.nombre}
                    size='small'
                    sx={styles.textfield}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {red.icono}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              })
            }
            <Grid item xs={12} sx={{ pt: 4 }}>
              <Button
                color={'primary'}
                size="large"
                startIcon={<Save />}
                sx={styles.textfield}
                type='submit'
                variant='contained'
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
