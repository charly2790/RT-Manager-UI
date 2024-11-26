import { Event } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React from 'react'

const styles = {
    containerIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export const DataCell = ({title, value}) => {
    return (
        <Grid container item xs={12} md={4}>
            <Grid container item xs={2} sx={styles.containerIcon}><Event fontSize='large'/></Grid>
            <Grid container xs={10}>
                <Grid item xs={12}><Typography variant="subtitle2" >{title}</Typography></Grid>
                <Grid item xs={12}><Typography variant='body2'>{value}</Typography></Grid>
            </Grid>
        </Grid>
    )
}
