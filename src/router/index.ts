import { createRouter, createWebHistory } from 'vue-router'
import startseiteLauferVue from '@/views/startseite-laufer.vue'
import neuerLauf from '@/views/Laufer/neuer-lauf.vue'
import einzLauf from '@/views/Laufer/lauf.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/startseite-laufer',
      name: 'Startseite Laufer',
      component: startseiteLauferVue
    },
    {
      path: '/neuer-lauf',
      name: 'Neuer lauf',
      component: neuerLauf
    },
    {
      path: '/lauf',
      name: 'Lauf',
      component: einzLauf
    }
  ]
})


export default router
