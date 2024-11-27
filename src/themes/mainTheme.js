import { ThemeContext } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
    palette:{
        primary: {
            main: '#5EC737',
          },
          secondary: {
            main: '#29303A',
            light: '#F5EBFF',
            contrastText: '#47008F',
          },
          tertiary:{
            main:"#ACB3C3"
          },
          quaternary:{
            main:"#F5F6FB"
          },       
    }
});

// De ser necesarios nuevos colores definirlos aquí
export const mainTheme = createTheme(theme, {
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: '#FF5733',
      },
      name: 'salmon',
    }),
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
    warning: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
})