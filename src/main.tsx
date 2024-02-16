import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
	/** Put your mantine theme override here */
});

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<MantineProvider theme={theme}>
				<App />
			</MantineProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
