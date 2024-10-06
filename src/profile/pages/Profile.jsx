import React, { useState } from 'react'
import dayjs from 'dayjs';
import { set, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { styles } from './styles'
import { styled } from '@mui/material';
import { methods } from '../../types';
import { Description, Edit, Facebook, Instagram, Save, X } from '@mui/icons-material'
import { DateInput, SelectInput, TelInput } from '../../components';
import { buildRequest } from '../../helpers';
import { Avatar, Box, Button, Divider, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import { AuthContext } from '../../auth';
import Axios from 'axios';
import { subDirs } from '../types';


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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export const Profile = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm()

  const [selectedImage, setSelectedImage] = useState(null);
  const { userLogged } = useContext(AuthContext);

  const onSubmit = handleSubmit( async (data) => {        
    
    //fechaNacimiento = dayjs(fechaNacimiento).format('YYYY-MM-DD');    
    
    const formData = new FormData();

    formData.append('idUsuario', userLogged.idUsuario);
    formData.append('profileImage', selectedImage);

    Object.keys(data).forEach(key => {
      if( key === 'fechaNacimiento'){
        data[key] = dayjs(data[key]).format('YYYY-MM-DD');
      }
      formData.append(key, data[key])
    })    

    const reqSettings = buildRequest(
      subDirs.profile,
      methods.post,
      formData,
      userLogged.token,      
      'multipart/form-data',
    )

    const { result } = await Axios.request(reqSettings);

    console.log( result )
  })

  const handleImageChange = (event) => { 
    const file = event.target.files[0];
    if (file) {
      //setSelectedImage(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };


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
              src={ selectedImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"}
              sx={styles.avatar}
            />
            <IconButton
              aria-label="upload new picture"
              size="sm"
              variant="outlined"
              color="neutral"
              sx={styles.iconButton}
              onClick={() => document.querySelector('#upload-photo').click()}
            >
              <Edit sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              <VisuallyHiddenInput 
                id="upload-photo" 
                type="file" 
                {...register("image", { onChange: handleImageChange })} // {{ edit_5 }}
                />
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
              <DateInput
                control={control}
                name="fechaNacimiento"
                label="Fecha de nacimiento"
                styles={styles.textfield}
                disableFuture={true}
              />
            </Grid>
            <Grid item xs={12} sx={styles.gridFormItem}>
              <InputLabel id="tel">Teléfono</InputLabel>
              <TelInput
                control={control}
                name="tel"
                countries={['AR']}
                styles={styles.textfield}
              />
            </Grid>
            <Grid item xs={12} sx={styles.gridFormItem}>
              <SelectInput
                register={register}
                options={['Femenino', 'Masculino', 'Otro']}
                label="Género"
                name="genero"
                styles={styles.textfield}
              />
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
                    {...register(red.nombre, { required: true })}
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
