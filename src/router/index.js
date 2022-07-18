import { useCommonStore } from '@/stores/common';
import { createRouter, createWebHistory } from 'vue-router';
import withCommonComponent from './withCommonComponent';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/splitpanes',
    name: 'splitpanes',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SplitView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: wrapCommonComponent(routes),
});

function wrapCommonComponent(routes) {
  return routes.map((route) => {
    route.component = withCommonComponent(route.component);
    if (route.children) {
      wrapCommonComponent(route.children);
    }
    return Object.assign({}, route);
  });
}

router.beforeEach((to, from, next) => {
  const commonStore = useCommonStore();

  // Spinner 동작
  if (to.name !== from.name) commonStore.on();

  // Popup Layout 적용
  if (to.query.mode === 'popup') {
    to.meta.layout = 'PopupLayout';
  }

  setTimeout(() => {
    next();
  }, 500);
});

export default router;
