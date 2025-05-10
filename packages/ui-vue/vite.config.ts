import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import dts from 'vite-plugin-dts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Function to generate entries for the components
const generateEntries = () => {
  return {
    Button: resolve(__dirname, 'lib/components/Button/index.ts'),
    Card: resolve(__dirname, 'lib/components/Card/index.ts')
  }
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.dts.json',
      exclude: ['lib/**/*.story.vue']
    })
  ],
  build: {
    minify: false,
    lib: {
      entry: generateEntries(),
      formats: ['es'],
      fileName: (_format, entryName) => `components/${entryName}/index.js`
    },
    rollupOptions: {
      external: ['vue', '@my-company/utils-ts', '@vueuse/core'],
      output: {
        dir: 'dist',
        format: 'es',
        manualChunks: (id) => {
          const component = id.match(/components\/([^\/]+)\//)
          if (component) {
            return `components/${component[1]}.js`
          }

          const util = id.match(/\/([^\/]+)\.ts$/)
          if (util) {
            const fileName = util[1]
            return `utils/${fileName}.js`
          }

          return 'shared'
        },
        chunkFileNames: '[name].js'
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
})
