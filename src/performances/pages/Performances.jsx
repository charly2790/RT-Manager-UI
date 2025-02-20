import _ from 'lodash';
import dayjs from 'dayjs';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react'
import { Box, Button, Drawer, Typography } from '@mui/material';
import { Chart } from '../../components/Charts';
import { mainTheme } from '../../themes/mainTheme';
import { ThemeProvider } from '@mui/material/styles';
import { set, useForm } from 'react-hook-form';
import { useAlumnosOptions, usePeriodosOptions } from '../hooks';
import { FilterForm, Filters } from '../components';
import { usePerformances } from '../hooks/usePerformances';



export const Performances = () => {

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const {
    control,
    getValues,
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: {
      alumno: null,
      periodo: dayjs().year(),
    }
  });

  const { alumnosOptions, isFetching } = useAlumnosOptions({ getValues, reset })
  const { periodosOptions, isFetching: onFetching } = usePeriodosOptions({ getValues, reset });
  const { data } = usePerformances(getValues())
  
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    setRefresh(!refresh);
  }

  const onSubmit = handleSubmit(async () => {
    console.log('values-->', getValues());
    setOpen(false);
  })

  const handleDelete = (e) => {
    console.log('borraste--->', e);
  }  

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <div>
          <Box>
            <Button onClick={toggleDrawer(true)} startIcon={<FilterListIcon />}>Filtros</Button>
            <Filters
              alumnos={alumnosOptions} 
              filters={getValues()}
              handleDelete={handleDelete}
              />
          </Box>
          <Drawer
            open={open}
            anchor={'right'}
            onClose={toggleDrawer(false)}
          >
            {
              <FilterForm
                params={[alumnosOptions, periodosOptions]}
                register={register}
                control={control}
                onSubmit={onSubmit}
                styles={{ maxWidth: 480, mt: 10, padding: '0 5% 0 5%' }}
              />
            }
          </Drawer>
        </div>
        <Chart type={'bar'} />
        <>
          {
            isFetching
              ? <Typography variant='h4'>Cargando...</Typography>
              : <Typography variant='h5'>{JSON.stringify(alumnosOptions)}</Typography>
          }
          {
            onFetching
              ? <Typography variant='h4'>Cargando...</Typography>
              : <Typography variant='h5'>{JSON.stringify(periodosOptions)}</Typography>
          }
          {
            <Typography variant='h5' sx={{fontWeight:"bold"}}>{JSON.stringify(data)}</Typography>
          }
        </>
      </ThemeProvider>
    </>
  )
}
