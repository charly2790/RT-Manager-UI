import _ from 'lodash';
import { AuthContext } from '../../auth';
import { Avatar, Box, Button, Divider, Grid, IconButton, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import { buildRequest } from '../../helpers';
import { CircularProgress } from '@mui/material';
import { createTheme, Snackbar, styled, ThemeProvider, Tooltip } from '@mui/material';
import { DateInput, SelectInput, TelInput } from '../../components';
import { Description, Edit, Facebook, Instagram, Save, X } from '@mui/icons-material'
import { mainTheme } from '../../themes/mainTheme';
import { methods } from '../../types';
import { set, useForm } from 'react-hook-form';
import { styles } from './styles'
import { subDirs } from '../types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'



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

const theme = createTheme();

export const Profile = () => {

  const { userLogged, updateProfile } = useContext(AuthContext);
  const { perfil = {} } = userLogged;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
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

    if (_.isEmpty(perfil)) {
      updatedData = {
        ...data,
        ['profileImage']: data.profileImage[0]
      }
    } else {
      updatedData = { ...getUpdatedFields(data, perfil) };
    }

    Object.keys(updatedData).forEach(key => {
      if (key === 'fechaNacimiento') {
        updatedData[key] = dayjs(updatedData[key]).format('YYYY-MM-DD');
      }
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

    if (res.status === 200 && !_.isNil(res.data) && !_.isNil(res.data.perfil)) {
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

  const onNavigateBack = () => {
    navigate(-1)
  }


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
    <ThemeProvider theme={mainTheme}>

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
              <Grid container item xs={5}>
                <Typography variant='h4' sx={{ mt: 2, mb: 2, mr: 2 }}>
                  Mi perfil
                </Typography>
                <Tooltip title="Certificados" placement="right-end">
                  <IconButton aria-label="delete" size='large' color='primary'>
                    <Description />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container item xs={12} position={'relative'}>
              <Avatar
                alt="Profile Picture"
                src={avatar}
                sx={styles.avatar}
              />
              <Tooltip title="Cambiar foto de perfil" placement='right-end'>
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
              </Tooltip>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12} sx={styles.gridFormItem}>
                <Typography variant='h6'>Datos personales</Typography>
              </Grid>
              <Grid item xs={12} sx={{ pt: 1 }}>
                <Divider />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.gridFormItem}>
                <TextField
                  variant="filled"
                  label="nombre"
                  sx={styles.textfield}
                  {...register("nombre", { required: true })}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.gridFormItem}>
                <TextField
                  variant="filled"
                  label="apellido"
                  sx={styles.textfield}
                  {...register("apellido", { required: true })}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.gridFormItem}>
                <TextField
                  variant="filled"
                  label="apodo"
                  sx={styles.textfield}
                  {...register("apodo", { required: true })}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.gridFormItem}>
                <DateInput
                  control={control}
                  name="fechaNacimiento"
                  label="Fecha de nacimiento"
                  styles={styles.textfield}
                  disableFuture={true}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.gridFormItem}>
                <InputLabel id="telefono">Teléfono</InputLabel>
                <TelInput
                  control={control}
                  name="telefono"
                  countries={['AR']}
                  styles={styles.textfield}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={styles.gridFormItem}>
                <SelectInput
                  control={control}
                  name="genero"
                  options={[
                    { label: 'Femenino', value: 'Femenino' },
                    { label: 'Masculino', value: 'Masculino' },
                    { label: 'Otro', value: 'Otro' },
                  ]}
                  styles={styles.textfield}
                  label="Género"
                  showInputLabel={true}
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
                  return <Grid item xs={12} md={6} key={index} sx={styles.gridFormItem}>
                    <TextField
                      variant="filled"
                      label={red.nombre}
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
              {/*  <Grid item xs={12} sx={{ pt: 4 }}>
                <Button
                  color={'primary'}
                  size="large"
                  startIcon={<Save />}
                  sx={styles.btnSubmit}
                  type='submit'
                  variant='contained'
                >
                  Guardar
                </Button>
              </Grid> */}
              <Grid container item xs={12} sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 1,
                mb: 3,
                [theme.breakpoints.down('sm')]: { pr: 1 }
              }}>
                <Grid container item xs={6} md={3} sx={styles.actionButtonContainer}>
                  <Button
                    variant='outlined'
                    sx={styles.actionButton}
                    size='large'
                    onClick={onNavigateBack}
                  >
                    {"Atras"}
                  </Button>
                </Grid>
                <Grid item xs={6} md={3} sx={styles.actionButtonContainer}>
                  <Button
                    disabled={!isDirty || isSubmitting}
                    color={'primary'}
                    size='large'
                    variant='contained'
                    startIcon={<Save />}
                    sx={styles.actionButton}
                    type='submit'
                  >
                    {isSubmitting
                      ? <CircularProgress size={24} />
                      : 'Guardar'
                    }
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    </ThemeProvider>
  )
}
