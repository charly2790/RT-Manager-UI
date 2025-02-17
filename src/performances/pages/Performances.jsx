import _ from 'lodash';
import dayjs from 'dayjs';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react'
import { Box, Button, Chip, Drawer, Typography } from '@mui/material';
import { Chart } from '../../components/Charts';
import { FilterForm } from '../components/FilterForm';
import { mainTheme } from '../../themes/mainTheme';
import { ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useAlumnosOptions, usePeriodosOptions } from '../hooks';
import { getLabel } from '../helpers';



export const Performances = () => {

  const [open, setOpen] = useState(false);

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


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  }

  const onSubmit = handleSubmit(async () => {
    console.log('values-->', getValues());
  })

  const handleDelete = (e) => {
    console.log('borraste--->', e);
  }

  const showFilters = () => {

    const filters = getValues();

    return Object.keys(filters).map(key => {
      if (!_.isNil(filters[key])) {
        const value = filters[key];
        const label = key === 'alumno' ? getLabel(alumnosOptions, value) : value;
        return <Chip key={key} label={label} variant="outlined" onDelete={handleDelete} />
      }
    })
  }

  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <div>
          <Box>
            <Button onClick={toggleDrawer(true)} startIcon={<FilterListIcon />}>Filtros</Button>
            {showFilters()}
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
        </>
      </ThemeProvider>
    </>
  )
}
