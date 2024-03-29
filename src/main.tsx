import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import UseScrollTop from './hooks/useScrollTop.tsx';
import ErrorHandler from './services/ErrorHandler.ts';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30, // 1000ms * 60s * 30m
      retry: 2,
    },
  },
  queryCache: new QueryCache({
    onError: (e: Error) => ErrorHandler(e),
  }),
  mutationCache: new MutationCache({
    onError: (e: Error) => ErrorHandler(e),
  }),
});

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UseScrollTop />
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        <Notifications limit={5} position="top-right" />
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
