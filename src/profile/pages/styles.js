import { createTheme } from '@mui/material/styles'; // Asegúrate de importar el tema
import { size } from 'lodash';

const theme = createTheme(); 

export const styles = {
    avatar: {
        width: 192,
        height: 192,
        /*[theme.breakpoints.down('sm')]: {
            width: 96,
            height: 96
        }*/
    },
    iconButton: {
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        zIndex: 2,
        borderRadius: '50%',
        left: 140,
        top: 130,
        boxShadow: 'sm',
        '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.7)'
        },        
        /*[theme.breakpoints.down('sm')]: {
            left: 56,
            top: 56,
            size: 'xs'
        }*/
    },
    gridFormItem:{
        pt: 2
    },
    textfield:{
        width: '80%',
    }


}