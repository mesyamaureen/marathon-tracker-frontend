import { createRouter, createWebHistory } from 'vue-router'
import startseiteLauferVue from '@/views/startseite-laufer.vue'
import neuerLauf from '@/views/Laufer/neuer-lauf.vue'
import einzLauf from '@/views/Laufer/lauf.vue'
import todoLauf from '@/views/neuer-todo-lauf.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
    },
    {
      path: '/neuer-todo-lauf',
      name: 'To Do Lauf',
      component: todoLauf
    }
  ]
})


export default router
