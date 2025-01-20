import { Grid, Typography } from '@mui/material'
import React from 'react'

export const EmptyMessage = ({message}) => {
    return (
        <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{                
                height: '60vh'
            }}
        >
            <Typography variant='h5'>{message}</Typography>
        </Grid>
    )
}
