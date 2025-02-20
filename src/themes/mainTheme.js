import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#5EC737',
    },
    secondary: {
      main: '#29303A',
      light: '#F5EBFF',
      contrastText: '#47008F',
    },
    tertiary: {
      main: '#ACB3C3',
    },
    quaternary: {
      main: '#F5F6FB',
    },
  },
});