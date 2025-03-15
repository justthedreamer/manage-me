import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routing/Router";
import {createPinia} from "pinia";

const pinia = createPinia()
const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
    console.error("Global error handler: ", err, info)
}

app.use(pinia)
app.use(router)

app.mount('#app')
