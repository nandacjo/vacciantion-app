import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
const app = createApp(App)

app.use(router)

// membuat global variable di vuejs
app.config.globalProperties.$apiURL = "http://localhost:8000/api/v1/"

app.mount('#app')