import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { subDirs } from '../types';
import { styles } from './styles'
import { Snackbar, styled } from '@mui/material';
import { set, useForm } from 'react-hook-form';
import { methods } from '../../types';
import { Description, Edit, Facebook, Instagram, Save, X } from '@mui/icons-material'
import { DateInput, SelectInput, TelInput } from '../../components';
import { buildRequest } from '../../helpers';
import { Avatar, Box, Button, Divider, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import { AuthContext } from '../../auth';
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

const defaultAvatar = "https://res.cloudinary.com/dev7swtde/image/upload/v1728164795/ProfilePictures/l6vkwm31pvbuqpsvosnr.jpg"

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

  let formValues = { ...formData };
  let updatedData = {};

  const redes = redesSociales.map(red => {
    return red.nombre;
  })

  if (formValues.redesSociales) {
    delete formValues.redesSociales;
  }

  Object.keys(formValues).forEach(key => {

    if (!redes.includes(key)) {
      if (key === 'fechaNacimiento') {
        if (!dayjs(formValues[key]).isSame(dayjs(profileData[key]))) {
          updatedData[key] = formValues[key];
        }
      } else if (key === 'profileImage') {
        if (formValues[key].length > 0) {
          updatedData[key] = formValues[key][0];
        }
      } else if (formValues[key] !== profileData[key]) {
        updatedData[key] = formValues[key];
      }

    } else if (formValues[key] !== profileData['redesSociales'][key]) {
      updatedData[key] = formValues[key];
    }

  })
  return updatedData;
}

export const Profile = () => {

  const { userLogged, updateProfile } = useContext(AuthContext);
  const { perfil = {} } = userLogged;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
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
  
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [open, setOpen] = useState(false);

  const onSubmit = handleSubmit(async (data) => {

    const formData = new FormData();
    
    let updatedData = {};

    if(_.isEmpty(perfil)){
      updatedData = {
        ...data,
        ['profileImage']:data.profileImage[0]
      }
    }else{
      updatedData = {...getUpdatedFields(data, perfil)}; 
    }        

    Object.keys(updatedData).forEach(key => {
      if (key === 'fechaNacimiento') {
        updatedData[key] = dayjs(updatedData[key]).format('YYYY-MM-DD');
      }
      console.log('key: ', key, 'value: ', updatedData[key]);
      formData.append(key, updatedData[key])
    })

    formData.append('idUsuario', userLogged.idUsuario);

    const reqSettings = buildRequest(
      !_.isEmpty(perfil) ? `${subDirs.profile}/${userLogged.idUsuario}` : subDirs.profile,
      !_.isEmpty(perfil) ? methods.patch : methods.post,
      formData,
      userLogged.token,
      'multipart/form-data',
    )

    const res = await Axios.request(reqSettings);

    if (res.status === 200 && res.statusText === 'OK' && data) {
      const { data: { message, perfil: perfilUpdated } } = res;      
      updateProfile(perfilUpdated);
      setAvatarUpdated(false);
      setAvatar(perfilUpdated.avatar);
      setOpen(true);
    }

  })

  useEffect(() => {
    if (perfil && perfil.avatar) {
      setAvatar(perfil.avatar);
    } else {
      setAvatar(defaultAvatar);
    }
  }, [])

  useEffect(() => {
    if (avatarUpdated) {
      setAvatar(defaultAvatar);
    } 
  }, [avatarUpdated])


  const handleImageChange = () => {
    setAvatarUpdated(true);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    navigate("/");
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={onSubmit}
      >
        {isSubmitSuccessful && <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Perfil actualizado correctamente"          
        />}
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
              src={avatar}
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
                {...register("profileImage", { onChange: handleImageChange })}
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
