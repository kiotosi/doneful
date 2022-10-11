import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import phosphor from "phosphor-vue";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(phosphor);
app.mount('#app');
