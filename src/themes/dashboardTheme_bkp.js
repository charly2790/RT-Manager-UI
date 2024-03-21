import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

export const dashboardTheme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        fontSize: '0.875rem',
        fontWeight: 600,
        borderRadius: 8.5,
        textTransform: 'none',
        '&.MuiButton-contained': {
          backgroundColor: '#009be5',
          '&:hover': {
            backgroundColor: '#006db3'
          },
        },
        '&.MuiButton-outlined': {
          color: "#fff",
          borderColor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
            root: {
                fontSize: '1.7rem',
            },
        },
      },
    },
    palette: {
      //Definición del color primario
      primary: {
        main: '#5ec737',
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        contrastText: '#47008F',
      },
    },
    typography: {
      h1: {
          fontSize: '1.6rem',
          fontWeight: 600,
          color: '#fff',
          letterSpacing: '0.5px',
          textTransform: 'capitalize',
      },
    },
  }
});
;