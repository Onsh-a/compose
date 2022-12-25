import { createRouter, createWebHistory } from 'vue-router';
import Main from './views/Main.vue';
import ChordApplicature from './views/ChordApplicature.vue';
import NotFound from './views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      path: '/chord-applicature',
      component: ChordApplicature,
    },
    {
      path: '/not-found',
      component: NotFound,
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/not-found',
    }
  ]
})

export default router;
