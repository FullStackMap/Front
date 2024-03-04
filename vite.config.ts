import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
//Need Fix to work with docker
		// proxy: {
		// 	'/server': {
		// 		target: 'http://localhost:32771',
		// 		changeOrigin: true,
		// 		rewrite: path => path.replace(/^\/server/, ''),
		// 	},
		// },
	},
});
