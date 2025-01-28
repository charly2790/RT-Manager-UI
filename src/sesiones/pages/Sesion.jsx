import _ from 'lodash';
import 'dayjs/locale/es';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Grid, Grow, InputAdornment, InputLabel, Link, Snackbar, TextField, ThemeProvider, Typography } from '@mui/material';
import { AuthContext } from '../../auth';
import { buildRequest } from '../../helpers';
import { convertToUtcTime } from '../../helpers';
import { createTheme } from '@mui/material/styles';
import { DataCell } from '../components';
import { DialogTrainingShotsSwiper } from '../components/DialogTrainingShotsSwiper';
import { DateInput, FileInput, SelectInput, TimeInput } from '../../components';
import { getShots } from '../helpers';
import { mainTheme } from '../../themes/mainTheme';
import { methods } from '../../types';
import { ROLES, SESSION_STATUS } from '../../types';
import { Save } from '@mui/icons-material'
import { styles } from './styles'
import { subDir } from '../types';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Axios from 'axios';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react'

dayjs.locale('es');

const theme = createTheme();
export const Sesion = () => {

  const { state } = useLocation();
  const { userLogged: { token, rol } } = useContext(AuthContext);
  const [readOnly, setReadOnly] = useState(true);
  const [showAdminFields, setShowAdminFields] = useState(false);
  const [haveMedia, setHaveMedia] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    onResponse: false,
    success: false,
    message: ""
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [shots, setShots] = useState([]);
  const navigate = useNavigate();

  const sesion = state ? state.sesion : undefined;
  const { EstadoSesion: { descripcion: estadoSesion }, Entrenamiento } = sesion;
  const entrenamientoMedia = Entrenamiento && Entrenamiento.MediaEntrenamientos ? Entrenamiento.MediaEntrenamientos : [];

  const {
    register,
    handleSubmit,
    getValues,
    formState: {
      errors,
      //isSubmitSuccessful,
      isDirty,
      dirtyFields,
      //defaultValues
    },
    control,
    //setValue
  } = useForm({
    defaultValues: {
      //archivo: undefined,
      rpe: { value: 0, label: '0 - Nada en absoluto 😄' },
      fechaEntrenamiento: dayjs(),
      ...Entrenamiento
    }
  });

  useEffect(() => {
    if (rol === ROLES.TEAM_LEADER || (rol === ROLES.TEAM_MEMBER && estadoSesion === SESSION_STATUS.VALIDATED)) {
      setShowAdminFields(true);
    }

    if ((rol === ROLES.TEAM_LEADER && estadoSesion !== SESSION_STATUS.VALIDATED) ||
      (rol === ROLES.TEAM_MEMBER && [SESSION_STATUS.PENDING, SESSION_STATUS.SENT].includes(estadoSesion))) {
      setReadOnly(false);
    }

    if (!_.isNil(Entrenamiento)) {
      setShots(getShots(Entrenamiento));
    }
  }, [])

  useEffect(() => {
    if (
      !_.isNil(Entrenamiento) &&
      !_.isNil(Entrenamiento.MediaEntrenamientos) &&
      Entrenamiento.MediaEntrenamientos.length > 0) {
      setHaveMedia(true);
    }
  }, [Entrenamiento])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (submitStatus.success) {
        onNavigateBack();
      } else {
        setSubmitStatus({
          onResponse: false,
          success: false,
          message: ""
        })
      }
    }, 3000);

    return () => clearTimeout(timer);

  }, [submitStatus.onResponse])


  const onNavigateBack = () => {
    navigate(-1)
  }

  const validateMandatoryFields = (fields) => {

    const mandatoryKeys = ['archivos', 'link', 'comentario'];
    let hasError = true;

    mandatoryKeys.forEach(key => {
      if (!_.isNil(fields[key])) {
        hasError = false;
      }
    })
    return hasError;
  }

  const onSubmit = handleSubmit(async (data) => {

    try {

      const { idSesion } = sesion;
      const formValues = getValues();
      let updatedKeys = Object.keys(formValues).filter(key => !_.isNil(formValues[key]))
      const isCreate = _.isNil(Entrenamiento);
      const formData = new FormData();

      console.log('updatedKeys-->', updatedKeys);
      console.log('getValues--->', Object.keys(getValues()));

      /* if (validateMandatoryFields(getValues())) {        
        throw new Error('Faltan campos obligatorios');
      } */

      if (!isCreate) {
        updatedKeys = !_.isEmpty(dirtyFields) ? Object.keys(dirtyFields) : [];
      }

      formData.append('idSesion', idSesion);

      updatedKeys.forEach(field => {
        if (field === 'archivos') {
          const archivos = data[field];
          archivos.forEach((archivo) => {
            formData.append('archivos', archivo);
          })
        } else {
          formData.append(field, data[field]);
        }
      })

      const reqEntrenamiento = buildRequest(
        isCreate ? subDir.entrenamientos : `${subDir.entrenamientos}/${sesion.Entrenamiento.idEntrenamiento}`,
        isCreate ? methods.post : methods.patch,
        formData,
        token,
        'multipart/form-data'
      )

      const res = await Axios.request(reqEntrenamiento);

      const { data: { message, result } } = res;

      if (res.status === 200 && !_.isNil(result)) {
        setSubmitStatus({
          onResponse: true,
          success: true,
          message
        });
      }
    } catch (error) {
      console.log(error.message);
      const { response: { data: { message } } } = error;
      setSubmitStatus({
        onResponse: true,
        success: false,
        message
      })
    }
  }
  )

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    let shotsToDelete = shots.filter(shot => shot.markToDelete);

    setOpenDialog(false);
  }

  return (
    <ThemeProvider theme={mainTheme}>
      {
        <Snackbar
          open={submitStatus.onResponse}
          autoHideDuration={2000}
          message={submitStatus.message}
        />
      }
      <Accordion sx={{ width: '95%' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
        >
          <Typography component="h1" variant="h5">
            {`${sesion.TipoSesion && sesion.TipoSesion.descripcion ? sesion.TipoSesion.descripcion : ''} - ${convertToUtcTime(sesion.fechaSesion).format("dddd  DD [de] MMMM [del] YYYY")}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            spacing={2}
          >
            <DataCell
              title={"Fecha de Sesión"}
              value={convertToUtcTime(sesion.fechaSesion).format("DD-MM-YYYY")}
              settings={{
                icon: "EVENT",
              }}
            />
            <DataCell
              title={"Tipo de Sesion"}
              value={sesion ? sesion.TipoSesion.descripcion : ''}
              settings={{
                icon: "DIRECTION_RUN",
              }}
            />
            <DataCell
              title={"Estado de la sesión"}
              value={sesion ? sesion.EstadoSesion.descripcion : ''}
              settings={sesion ? sesion.EstadoSesion.idEstado === 1
                ? { icon: "PENDING", color: "info.main" }
                : sesion.EstadoSesion.idEstado === 2
                  ? { icon: "DONE", color: "sucess.dark" }
                  : { icon: "WARNING", color: "error.main" }
                : { icon: "PENDING", color: "info.main" }
              }

            />
            <DataCell
              title={"Objetivo"}
              value={sesion ? sesion.Objetivo : ''}
              settings={{ icon: "GOAL" }}
            />
            <DataCell
              title={"Comentarios"}
              value={sesion.comentario ? sesion.comentario : 'N/A'}
              settings={{ icon: 'COMMENTS' }}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Box
        component="form"
        noValidate
        sx={{ pt: 1, pr: 2, pb: 2, pl: 2 }}
        onSubmit={onSubmit}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2, mt: 2 }}>
          Entrenamiento
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          {
            showAdminFields &&
            <Grid item xs={12} md={6}>
              <InputLabel id="distancia" sx={{ mt: 2 }}>{"Distancia"}</InputLabel>
              <TextField
                sx={styles.textfield}
                disabled={readOnly}
                type='number'
                InputProps={{
                  startAdornment: <InputAdornment position="start">km</InputAdornment>,
                }}
                {...register("distancia")}
              />
            </Grid>
          }
          {
            showAdminFields &&
            <Grid item xs={12} md={6}>
              <TimeInput
                control={control}
                name="tiempoTotal"
                label="Tiempo total de la sesión"
                styles={styles.textfield}
                defaultValue={'2022-04-17T00:00'}
                disabled={readOnly}
                showInputLabel={true}
                inputLabelStyles={{ mt: 2 }}
              />
            </Grid>
          }
          {
            showAdminFields &&
            <Grid item xs={12} md={6}>
              <TimeInput
                control={control}
                name="tiempoNeto"
                label="Tiempo neto de la sesión"
                styles={styles.textfield}
                defaultValue={'1990-05-27T00:00'}
                disabled={readOnly}
                showInputLabel={true}
                inputLabelStyles={{ mt: 1 }}
              />
            </Grid>
          }
          {
            showAdminFields &&
            <Grid item xs={12} md={6}>            
              <InputLabel id="entrenamientoRealizado" sx={{ mt: 1 }}>{"Entrenamiento Realizado"}</InputLabel>
              <TextField
                multiline
                disabled={readOnly}
                rows={2}
                required
                id="entrenamientoRealizado"
                name="entrenamientoRealizado"
                autoComplete="family-name"
                sx={styles.textfield}
                {...register("entrenamientoRealizado")}
              />
              </Grid>            
          }
          <Grid item xs={12} md={6}>
            <DateInput
              control={control}
              //defaultValue={dayjs()}
              disabled={readOnly}
              disableFuture={true}
              inputLabelStyles={{ mt: 1 }}
              label="Fecha de Entrenamiento"
              name="fechaEntrenamiento"
              showInputLabel={true}
              styles={{ ...styles.textfield, }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id="link" mt={2} sx={{ mt: 1 }}>{"Link"}</InputLabel>
            <TextField
              error={errors.link ? true : false}
              required
              sx={styles.textfield}
              id="link"
              disabled={readOnly}
              name="link"
              value={undefined}
              {...register("link", {
                /*  required: {
                   value: !Object.keys(dirtyFields).some(dirtyField => dirtyField === 'archivos'),
                   message: 'El link es requerido'
                 }, */
                minLength: {
                  value: 3,
                  message: 'Debe contener al menos 3 caracteres'
                }
                //TODO validar con REGEX
              })}
              helperText={errors.link ? errors.link.message : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FileInput
              //mandatory={!Object.keys(dirtyFields).some(dirtyField => dirtyField === 'link')}
              disabled={readOnly}
              control={control}
              label={"Archivo"}
              name={"archivos"}
              showInputLabel={true}
              styles={styles.textfield}
              inputLabelStyles={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectInput
              control={control}
              name="rpe"
              disabled={readOnly}
              options={[
                { value: 0, label: '0 - Nada en absoluto 😄' },
                { value: 1, label: '1 - Muy débil 😄' },
                { value: 2, label: '2 - Débil 😄' },
                { value: 3, label: '3 - Moderado 😃' },
                { value: 4, label: '4 - Un poco fuerte 😃' },
                { value: 5, label: '5 - Fuerte 🙂' },
                { value: 6, label: '6 - Fuerte 🙂' },
                { value: 7, label: '7 - Muy fuerte 🙁' },
                { value: 8, label: '8 - Muy fuerte 🙁' },
                { value: 9, label: '9 - Muy muy fuerte 😦' },
                { value: 10, label: '10 - Muy muy fuerte 😦' },

              ]}
              styles={styles.textfield}
              label="RPE (Escala de esfuerzo percibido)"
              showInputLabel={true}
              inputLabelStyles={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel id="comentario" sx={{ mt: 2 }}>{"Comentario"}</InputLabel>
            <TextField
              multiline
              disabled={readOnly}
              rows={2}
              required
              id="comentario"
              name="comentario"
              autoComplete="family-name"
              sx={styles.textfield}
              {...register("comentario")}
            />

          </Grid>
          {
            haveMedia &&
            <Grid container item xs={12} md={6} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Link
                sx={{ mt: 2 }}
                onClick={handleOpenDialog}
              >
                {"VER ARCHIVOS"}
              </Link>
            </Grid>
          }
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
                disabled={!isDirty}
                variant='contained'
                startIcon={<Save />}
                sx={styles.actionButton}
                size='large'
                type='submit'
              >
                {"Guardar"}
              </Button>
            </Grid>
          </Grid>
        </Grid>        
        <DialogTrainingShotsSwiper
          open={openDialog}
          onClose={handleCloseDialog}
          shots={shots}
        />
      </Box>
    </ThemeProvider>
  )
}
