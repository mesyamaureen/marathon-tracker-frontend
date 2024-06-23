<template>
    <sidebar-menu :menu="menu" :hide-toggle="true" :width="'175px'">
      <template v-slot:toggle-icon>runnerslog</template>
    </sidebar-menu>
   </template>
   
   
   <script lang="ts">
   import { h } from 'vue'
   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
   
   
   const separator = h('hr', {
    style: {
      borderColor: 'rgba(0, 0, 0, 0.1)',
      margin: '20px',
    },
})


const faIcon = (props: any) => {
 return {
   element: h('div', [h(FontAwesomeIcon, { size: 'lg', ...props })]),
 }
}


export default {
 data() {
   return {
     menu: [
       {
         header: 'RUNNERSLOG',
         hiddenOnCollapse: true
       },
       {
         href: '/',
         title: 'Startseite',
         icon: faIcon({ icon: 'fa-solid fa-person-running' }),
       },
       {
         href: '/neuer-lauf',
         title: 'Neuer Lauf',
         icon: faIcon({ icon: 'fa-solid fa-plus' }),
       },
       {
         href: '/neuer-todo-lauf',
         title: 'To Do Lauf',
         icon: faIcon({ icon: 'fa-solid fa-plus' }),
       }
     ],
   }
}
}
</script>   