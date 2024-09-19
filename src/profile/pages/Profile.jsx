import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Avatar, Button, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AccountCircle, Edit, Facebook, Instagram, Save, X } from '@mui/icons-material'
import { MuiTelInput } from 'mui-tel-input';
import { styles } from './styles'
import React, { useState } from 'react'
import { Form } from 'react-hook-form';

const redesSociales = [
  { 
    nombre:'Facebook',
    icono: <Facebook/>
  },
  {
    nombre: 'Instagram',
    icono: <Instagram/>
  },
  {
    nombre: 'X',
    icono: <X/>
  },  
]


export const Profile = () => {

  const [phone, setPhone] = useState('')

  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }


  return (
    <>
      <Grid container sx={{mb:16}}>
        <Grid item xs={12}>
          <Typography variant='h4' sx={{ mt: 1, mb: 2 }}>
            Mi perfil
          </Typography>
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
            <TextField variant="filled" label="nombre" size='small' sx={styles.textfield} />
          </Grid>
          <Grid item xs={12} sx={styles.gridFormItem}>
            <TextField variant="filled" label="apellido" size='small' sx={styles.textfield} />
          </Grid>
          <Grid item xs={12} sx={styles.gridFormItem}>
            <TextField variant="filled" label="apodo" size='small' sx={styles.textfield} />
          </Grid>
          <Grid item xs={12} sx={styles.gridFormItem}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={styles.textfield}>
                <DatePicker variant="filled" label="Fecha de nacimiento" />
              </DemoContainer>
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
            redesSociales.map( (red, index ) =>{
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
          <Grid item xs={12} sx={{pt:4}}>
            <Button color='primary' variant='contained' size = "large" sx={styles.textfield} startIcon={<Save/>}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
