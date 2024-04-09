import React from 'react';
import ReactDOM from 'react-dom/client';

// mui imports
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';

// local imports
import App from './App';
import theme from './theme/theme';

// third party
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SnackbarProvider maxSnack={3}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </SnackbarProvider>
    </React.StrictMode>
);
