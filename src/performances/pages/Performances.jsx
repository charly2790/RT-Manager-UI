import React, { useEffect, useState } from 'react'
import { Button, Drawer, Grid, Typography } from '@mui/material';
import { Chart } from '../../components/Charts';
import { FilterForm } from '../components/FilterForm';
import { mainTheme } from '../../themes/mainTheme';
import { ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { useAlumnosOptions } from '../../hooks';


export const Performances = () => {


  const [open, setOpen] = useState(false);  
  const { alumnosOptions, isFetching } = useAlumnosOptions();

  const {
    control,
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      alumno: alumnosOptions.length > 0 ? alumnosOptions[0].value : 99999      
    }
  });

  useEffect(() => {
    if(!isFetching){
      if(alumnosOptions.length > 0){
        reset({ alumno: alumnosOptions[0].value})
      }
    }    
  }, [alumnosOptions])
  
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
              params={[alumnosOptions.isFetching ? [] : alumnosOptions]}
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
            isFetching
              ? <Typography variant='h4'>Cargando...</Typography>
              : <Typography variant='h5'>{JSON.stringify(alumnosOptions)}</Typography>
          }
        </>
      </ThemeProvider>
    </>
  )
}
