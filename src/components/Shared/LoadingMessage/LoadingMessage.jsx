import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styles } from './styles.js';


export const LoadingMessage = () => {
  return (
    <Box sx={styles.loadingMessageContainer}>
      <CircularProgress />
    </Box>
  )
}
