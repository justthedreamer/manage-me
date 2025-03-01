import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./routing/Router";

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
    console.error("Global error handler: ", err, info)
}

app.use(router)

app.mount('#app')
