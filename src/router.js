import { createRouter, createWebHashHistory } from 'vue-router';
import Main from './views/Main.vue'
import ChordApplicature from './views/ChordApplicature.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      path: '/chord-applicatures',
      component: ChordApplicature,
    }
  ]
})

export default router;
