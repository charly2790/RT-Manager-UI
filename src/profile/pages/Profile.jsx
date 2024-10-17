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
import _ from 'lodash';


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

const getUpdatedFields = (formData, profileData) => {
  console.log('_____________________________________');
  console.log('Entra al handlesubmit');

  let formValues = { ...formData };
  let updatedData = {};
  const redes = redesSociales.map(red => {
    return red.nombre;
  })

  Object.keys(formData).forEach(key => {

    let hasChanged = false;

    if (!redes.includes(key)) {
      if (key === 'fechaNacimiento') {
        if (!dayjs(formData[key]).isSame(dayjs(profileData[key]))) {
          hasChanged = true;
        }
      } else if (key === 'image') {
        if (formData[key].length > 0) {
          hasChanged = true;
        }
      } else if (formData[key] !== profileData[key]) {
        hasChanged = true;
      }

    } else if (formData[key] !== profileData['redesSociales'][key]) {
      hasChanged = true;
    }

    if (hasChanged) {
      updatedData[key] = formData[key];
    }

  })

  console.log('updatedData-->', updatedData);
  console.log('_____________________________________');
  return updatedData;
}


export const Profile = () => {

  const { userLogged, updateProfile } = useContext(AuthContext);
  const { perfil = {} } = userLogged;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm({
    defaultValues: {
      ...perfil,
      fechaNacimiento: !_.isEmpty(perfil) ? dayjs(perfil.fechaNacimiento) : null,
      genero: !_.isEmpty(perfil) ? perfil.genero : '',
      Facebook: !_.isEmpty(perfil) ? perfil.redesSociales.Facebook : '',
      Instagram: !_.isEmpty(perfil) ? perfil.redesSociales.Instagram : '',
      X: !_.isEmpty(perfil) ? perfil.redesSociales.X : '',
    }
  })

  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = handleSubmit(async (data) => {

    let updatedData = {};
    //Si perfil tiene datos es porque estoy actualizando un perfil
    if (!_.isEmpty(perfil)) {
      updatedData = getUpdatedFields(data, perfil);
    }

    return;

    const formData = new FormData();

    formData.append('idUsuario', userLogged.idUsuario);
    formData.append('profileImage', selectedImage);

    Object.keys(data).forEach(key => {
      if (key === 'fechaNacimiento') {
        data[key] = dayjs(data[key]).format('YYYY-MM-DD');
      }
      formData.append(key, data[key])
    })

    const reqSettings = buildRequest(
      !_.isEmpty(perfil) ? `${subDirs.profile}/${userLogged.idUsuario}` : subDirs.profile,
      !_.isEmpty(perfil) ? methods.put : methods.post,
      formData,
      userLogged.token,
      'multipart/form-data',
    )

    const res = await Axios.request(reqSettings);

    if (res.status === 200 && res.statusText === 'OK' && data) {
      const { data } = res;
      updateProfile(data);
    }

    //1) verificar si se retorna el objeto con la propiedad status [Ok]
    //2) si el status es ok, actualizar el estado del componente. Se debe observar la actualización de la imagen de perfil.[Ok]
    //4) Recuperar el perfil al hacer el login & almacenar en contexto [Ok]
    //5) Mostrar datos de perfil almacenados en el contexto al iniciar pantalla de perfil[OK]
    //3) si el status es error, mostrar el error
    //6) Corregir campos que no se visualizan.
    //7) Si el perfil ya esta creado en back invocar al update profile

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
              src={selectedImage ? selectedImage : !_.isEmpty(perfil) ? perfil.avatar : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"}
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
              <InputLabel id="telefono">Teléfono</InputLabel>
              <TelInput
                control={control}
                name="telefono"
                countries={['AR']}
                styles={styles.textfield}
              />
            </Grid>
            <Grid item xs={12} sx={styles.gridFormItem}>
              <SelectInput
                control={control}
                name="genero"
                options={['Femenino', 'Masculino', 'Otro']}
                styles={styles.textfield}
                label="Género"
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
