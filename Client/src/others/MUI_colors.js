import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0b31be',
            contrastText: '#ffffff', // Cambia este valor al color principal que desees
        },
        secondary: {
            main: '#2e47ce',
            contrastText: '#ffffff', // Cambia este valor al color secundario que desees
        },
        white: {
            main: '#ffffff',
            contrastText: '#ffffff', // Cambia este valor al color de error que desees
        },
        buttons: {
            main: '#2196f3',
            contrastText: '#ffffff', // Cambia este valor al color de advertencia que desees
        },
        options: {
            main: '#d3d3d3',
            contrastText: '#000000', // Cambia este valor al color de información que desees
        },
        success: {
            main: '#4caf50',
            contrastText: '#ffffff', // Cambia este valor al color de éxito que desees
        },
        red: {
            main: '#ff0000',
            contrastText: '#ffffff',
        },
        dark: {
            main: '#262626',
            contrastText: '#ffffff'
        },
        important: {
            main: '#FFD700',
            contrastText: '#000000'
        }
    },
});

export default theme;
