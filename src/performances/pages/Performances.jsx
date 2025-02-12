import React, { useEffect, useState } from 'react'
import { Button, Drawer, Grid, Typography } from '@mui/material';
import { Chart } from '../../components/Charts';
import { FilterForm } from '../components/FilterForm';
import { mainTheme } from '../../themes/mainTheme';
import { ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useRandom } from '../../hooks/useRandom';
import _ from 'lodash';

const getAlumnosOptions = (alumnosData) => {

  if(alumnosData.length === 0) return [];

  return alumnosData.map(alumno => {

    const label = _.isNil(alumno.Perfil) ? alumno.email : alumno.Perfil.apodo;
    const value = _.isNil(alumno.suscripciones) ? 99 : alumno.suscripciones[0].idSuscripcion

    return {
      label,
      value
    }
  })

}

export const Performances = () => {

  const { getAlumnosQuery } = useRandom();

  const [open, setOpen] = useState(false);
  const [alumnosOptions, setAlumnosOptions] = useState([]);

  const {
    control,
    getValues,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      alumno: alumnosOptions.length > 0 ? alumnosOptions[0].value : 99999      
    }
  });

  useEffect(() => {
    if(!getAlumnosQuery.isFetching){
      setAlumnosOptions(getAlumnosOptions(getAlumnosQuery.data.usuarios));
    }
  }, [getAlumnosQuery.data])


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const onSubmit = handleSubmit(async () => {
    console.log('values-->', getValues());
  })


  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <div>
          <Button onClick={toggleDrawer(true)}>Open drawer</Button>
          <Drawer
            open={open}
            anchor={'right'}
            onClose={toggleDrawer(false)}
          >
            <FilterForm
              params={[getAlumnosQuery.isFetching ? [] : getAlumnosOptions(getAlumnosQuery.data.usuarios)]}
              register={register}
              control={control}
              onSubmit={onSubmit}
              styles={{ maxWidth: 480, mt: 10, padding: '0 5% 0 5%' }}
            />
          </Drawer>
        </div>
        <Chart type={'bar'} />
        <>
          {
            getAlumnosQuery.isFetching
              ? <Typography variant='h4'>Cargando...</Typography>
              : <Typography variant='h5'>{JSON.stringify(getAlumnosQuery.data)}</Typography>
          }
        </>
      </ThemeProvider>
    </>
  )
}
