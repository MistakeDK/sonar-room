import { createRouter, createWebHashHistory } from 'vue-router';
import LauncherRoute from '../routes/LauncherRoute.vue';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'launcher',
      component: LauncherRoute,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { name: 'launcher' },
    },
  ],
});