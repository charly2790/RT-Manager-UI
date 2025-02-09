import React, { useState } from 'react'
import { Button, Drawer, Grid, Typography } from '@mui/material';
import { Chart } from '../../components/Charts';
import { useForm } from 'react-hook-form';
import { FilterForm } from '../components/FilterForm';

export const Performances = () => {

  const [open, setOpen] = useState(false);
  const {
    control,
    getValues,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      alumno: {value: 'Carlos Barrionuevo', label: 'Carlos Barrionuevo'}
    }
  });

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const onSubmit = handleSubmit(async () => {
    console.log('values-->', getValues());
  })


  return (
    <>
      <div>
        <Button onClick={toggleDrawer(true)}>Open drawer</Button>
        <Drawer
          open={open}
          anchor={'right'}
          onClose={toggleDrawer(false)}
        >
          <FilterForm
            register={register}
            control={control}
            onSubmit={onSubmit}
            styles={{ width: 480, mt: 10, padding:'0 5% 0 5%' }}
          />
        </Drawer>
      </div>
      <Chart type={'bar'} />
    </>
  )
}
