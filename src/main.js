import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import layout from './plugins/layout';
import splitpanes from './plugins/splitpanes';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(layout);
app.use(splitpanes);

app.mount('#app');
