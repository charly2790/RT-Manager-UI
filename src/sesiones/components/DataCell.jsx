import { mainTheme } from '../../themes/mainTheme';
import { Grid, Typography } from '@mui/material'
import { ThemeProvider } from '@emotion/react';
import { IconCell } from './IconCell';


export const DataCell = ({
    title,
    value,    
    settings
}) => {
    const { icon, color = 'black' } = settings;
    return (
        <ThemeProvider theme={mainTheme}>
            <Grid container item xs={12} md={4}>
                <IconCell icon={icon} />
                <Grid container xs={10}>
                    <Grid item xs={12}><Typography variant="subtitle1" >{title}</Typography></Grid>
                    <Grid item xs={12}><Typography variant='body2' sx={{color: color}} >{value}</Typography></Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
