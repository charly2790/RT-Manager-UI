import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Avatar, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Edit } from '@mui/icons-material'
import { MuiTelInput } from 'mui-tel-input';
import { styles } from './styles'
import React, { useState } from 'react'


export const Profile = () => {

  const [phone, setPhone] = useState('')

  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }


  return (
    <>
      <Grid container>
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
            <Typography variant='h5'>Datos personales</Typography>
          </Grid>
          <Grid item xs={12} sx={{pt:1}}>
            <Divider />
          </Grid>
          <Grid item xs={12} sx={styles.gridFormItem}>
            <TextField variant="filled" label="nombre" size='small'/>
          </Grid>
          <Grid item xs={12} sx={styles.gridFormItem}>
            <TextField variant="filled" label="apellido" size='small'/>
          </Grid>
          <Grid item xs={12} sx={styles.gridFormItem}>
            <TextField variant="filled" label="apodo" size='small' />
          </Grid>
          <Grid item xs={12} sx={styles.gridFormItem}>
            <TextField variant="filled" label="apodo" size='small' />
          </Grid>
          <Grid item xs={10} sx={styles.gridFormItem}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DemoContainer components={['DatePicker']} >
                <DatePicker variant="filled" label="Fecha de nacimiento" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={10} sx={styles.gridFormItem}>
            <MuiTelInput value={phone} onChange={handleChange} defaultCountry='AR' />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
