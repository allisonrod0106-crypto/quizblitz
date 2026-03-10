import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './router'


const app = createApp(App)
app.use(createPinia()) //registered before router
app.use(router)
app.mount('#app')