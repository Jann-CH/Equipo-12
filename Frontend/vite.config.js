import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      // Actualiza automáticamente el Service Worker cuando exista una nueva versión
      registerType: 'autoUpdate',

      // Archivos adicionales que se copiarán al build
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'mask-icon.svg'
      ],

      // Configuración del manifiesto de la PWA
      manifest: {
        // Nombre completo de la aplicación
        name: 'Innova Mentor',

        // Nombre corto que verá el usuario al instalar la aplicación
        short_name: 'Innova Mentor',

        // Descripción de la aplicación
        description:
          'Aplicación Web Progresiva para acompañar a personas adultas a recuperar el hábito del estudio.',

        // Colores principales de la aplicación
        theme_color: '#EEF4FF',
        background_color: '#FFFFFF',

        // Configuración de visualización
        display: 'standalone',
        orientation: 'portrait',

        // Página inicial
        start_url: '/',

        // Iconos utilizados por Android y la instalación de la PWA
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),

    tailwindcss(),
  ]
})