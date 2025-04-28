import { createHead } from '@unhead/vue/client';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './i18n.js';
import router from './router.js';
import App from './App.vue';
import 'quill/dist/quill.core.css';

const pinia = createPinia();

createApp(App)
  .use(createHead())
  .use(i18n)
  .use(pinia)
  .use(await router(pinia))
  .mount('#app');
