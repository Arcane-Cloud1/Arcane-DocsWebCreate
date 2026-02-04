import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './theme/styles.css'
import siteConfig from './siteConfig'

// Set document title from config
document.title = siteConfig.title

const app = createApp(App)
app.use(router)
app.mount('#app')
