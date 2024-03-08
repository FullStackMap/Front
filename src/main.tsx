import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import UseScrollTop from './hooks/useScrollTop.tsx';

const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
  primaryColor: 'teal',
  white: '#f5f5f5',
  black: '#272727',
  colors: {},
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
      <UseScrollTop />
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        <Notifications limit={5} position="top-right" />
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
