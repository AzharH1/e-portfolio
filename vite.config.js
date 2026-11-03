import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          // Keep shared React dependencies from pulling deferred 3D code into the entry.
          includeDependenciesRecursively: false,
          groups: [
            { name: 'three-core', test: /three\/build\/three.core/ },
            { name: 'three-renderer', test: /three\/build\/three.module/ },
            { name: 'three-helpers', test: /node_modules\/(?:@react-three|three-stdlib|maath)\// },
            { name: 'react', test: /node_modules\/(?:react|react-dom|scheduler)\// },
          ],
        },
      },
    },
  },
})
