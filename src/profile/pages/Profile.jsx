import { Edit } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

export const Profile = () => {


  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4' sx={{ mt: 1, mb: 2 }}>
            Mi perfil
          </Typography>
        </Grid>
        <Grid container item xs={12} md={4} sx={{ border: "1px solid red" }} position={'relative'}>
          <Avatar
            alt="Profile Picture"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            sx={{ width: 192, height: 192 }}
          />
          <IconButton
            aria-label="upload new picture"
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              zIndex: 2,
              borderRadius: '50%',
              left: 140,
              top: 130,
              boxShadow: 'sm',
              '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)'}
            }}
          >
            <Edit sx={{ color: 'rgba(255, 255, 255, 0.7)'}} />
          </IconButton>
        </Grid>       
      </Grid>
    </>
  )
}
