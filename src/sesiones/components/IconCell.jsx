import { Grid } from '@mui/material'
import { icons } from '../types'

const styles = {
    containerIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export const IconCell = ({ icon }) => {
  return (
    <Grid container item xs={2} sx={styles.containerIcon}>{icons[icon]}</Grid>
  )
}
