import '@/assets/scss/base.scss';

import { createApp } from 'vue';

import router from './router';
import { store } from './store';
import { appSocket, chatSocket, userSocket } from '@/socket';

import App from './App.vue';

const app = createApp(App);

app
  .use(store)
  .use(router)
  .mount('#app');

[chatSocket, appSocket, userSocket].forEach(socket => {
  socket.registerEvents();
});
