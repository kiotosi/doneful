import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import router from './router/router';
import './scss/base.scss';
import 'phosphor-icons';
import 'normalize.css';

// Localization
import ru from './locales/ru.json';
import en from './locales/en.json';
import ua from './locales/ua.json';
import ja from './locales/ja.json';
import { detectLanguauge } from './utils/language';
import { DictionarySchema, SupportedLanguages } from './types/language.types';


const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n<DictionarySchema[], SupportedLanguages>({
  locale: detectLanguauge(),
  messages: {
    'en-US': en,
    'ja-JP': ja,
    'ru-RU': ru,
    'ua-UA': ua
  },
  fallbackLocale: 'en-US'
});

app.use(router);
app.use(pinia);
app.use(i18n);
app.mount('#app');
