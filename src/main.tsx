import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const theme = createTheme({
  white: '#f5f5f5',
  black: '#272727',
  colors: {},
  fontFamily: 'Arial, sans-serif',
  // radius: {},
  // spacing: ,
  // fontSizes: [],
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Notifications limit={5} />
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
