import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import request from './util/request.js';
import storage from './util/storage.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App);
for (let iconName in ElementPlusIconsVue) {
    app.component(iconName, ElementPlusIconsVue[iconName])
  }
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.use(router).use(ElementPlus).mount('#app');
