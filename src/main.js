import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { PiniaSharedState } from 'pinia-shared-state';

import App from './App.vue';
import router from './router';
import layout from './plugins/layout';
import splitpanes from './plugins/splitpanes';

const app = createApp(App);
const pinia = createPinia();

pinia.use(PiniaSharedState({}));

app.use(pinia);
app.use(router);
app.use(layout);
app.use(splitpanes);

app.mount('#app');
