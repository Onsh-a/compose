import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Main from './views/Main.vue';
import ChordApplicature from './views/ChordApplicature.vue';
import NotFound from './views/NotFound.vue';
import Tuner from './views/Tuner.vue';

export const routes: Array<RouteRecordRaw & { isAvailableInMenu: boolean }> = [
  {
    path: '/',
    component: Main,
    isAvailableInMenu: true,
    name: 'Main',
  },
  {
    path: '/chord-applicature',
    component: ChordApplicature,
    isAvailableInMenu: true,
    name: 'Chord Applicature',
  },
  {
    path: '/tuner',
    component: Tuner,
    isAvailableInMenu: true,
    name: 'Tuner',

  },
  {
    path: '/not-found',
    component: NotFound,
    isAvailableInMenu: false,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/not-found',
    isAvailableInMenu: false,
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
