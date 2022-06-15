import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import request from './util/request.js';
const app = createApp(App);
app.config.globalProperties.$request = request;
app.use(router).use(ElementPlus).mount('#app');
