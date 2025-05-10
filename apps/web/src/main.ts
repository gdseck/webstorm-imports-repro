import { createApp } from 'vue'
import App from './App.vue'

// Import utilities from utils-ts package
import { isDef, isString } from '@my-company/utils-ts/core'
import { capitalize } from '@my-company/utils-ts/string'

// Create and mount the Vue app
const app = createApp(App)
app.mount('#app')

// Example of using the imported utilities
if (isDef(window) && isString(window.location.href)) {
  console.log(`Running app at: ${capitalize(window.location.href)}`)
}