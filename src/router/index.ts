import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_REPOSITORY_NAME),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPomodoro.vue'),
    },
    {
      path: '/state',
      name: 'state',
      component: () => import('../views/UserStatement.vue'),
    },
  ],
});

export default router;
