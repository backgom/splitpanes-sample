import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PopupLayout from '@/layouts/PopupLayout.vue';

export default {
  install(app) {
    app.component('DefaultLayout', DefaultLayout);
    app.component('PopupLayout', PopupLayout);
  },
};
