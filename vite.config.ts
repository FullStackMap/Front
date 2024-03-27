import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      devOptions: { enabled: true },
      injectRegister: 'script-defer',
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
        globPatterns: ['**/*.{js,css,html,png,svg}'],
      },

      manifest: {
        scope: '/',
        name: 'From A2B',
        short_name: 'From-A2B',
        description:
          'From A2B est une application simple qui vous aide organiser vos voyages',
        theme_color: '#099268',
        background_color: '#242424',
        display_override: ['standalone', 'minimal-ui', 'fullscreen'],
        display: 'browser',

        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
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
