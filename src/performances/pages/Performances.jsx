import _ from 'lodash';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react'
import { Box, Button, Drawer, Typography } from '@mui/material';
import { Chart } from '../../components/Charts';
import { mainTheme } from '../../themes/mainTheme';
import { ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useAlumnosOptions, useOrigin, usePeriodosOptions } from '../hooks';
import { FilterForm, Filters } from '../components';
import { usePerformances } from '../hooks/usePerformances';
import { getSeries } from '../helpers';
import { xAxis } from '../types';
import { useLocation } from 'react-router-dom';



export const Performances = () => {

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { getTitle } = useOrigin();

  const {
    control,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      alumno: 0,      
      periodo: 1800
    }
  });

  const { alumnosOptions, isFetching } = useAlumnosOptions({ getValues, reset })
  const { periodosOptions, isFetching: onFetching } = usePeriodosOptions({ getValues, reset });

  const { getPerformanceQuery, getPerformanceByWeek } = usePerformances(getValues());

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
          <Typography variant='h4' sx={{ mb : 2 }}>{ getTitle() }</Typography>
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
                setValue={setValue}
                getValues={getValues}
                styles={{ maxWidth: 480, mt: 10, padding: '0 5% 0 5%' }}
              />
            }
          </Drawer>
        </div>
        <Chart type={'bar'} data={{ series: getSeries( getPerformanceQuery.data ) }} options={{ xAxis }} />
        
      </ThemeProvider>
    </>
  )
}
