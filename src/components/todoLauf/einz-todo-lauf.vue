<script lang="ts">
import { onMounted, ref, type Ref, defineComponent } from 'vue';
import { type todoLauf } from '@/components/lauf/alle-laeufe.vue' ;
import router from '@/router';
import { useRoute, useRouter } from 'vue-router';
import laufItem from '@/components/lauf-item.vue';

export default defineComponent({
  components: {
    laufItem
  },
  data() {
    return {
      alleLaeufe: [] // Make sure this is populated with your data
    };
  },
  methods: {
    handleLaufClick(laufId: number) {
        console.log("handleLaufClick laufId: ", laufId)
      this.getLauf(laufId);
    },
    getLauf(laufId: number) {
      // Fetch the GET method to the backend
      console.log('laufId:', laufId);
      
      const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
      const endPoint = `${baseUrl}/alleLaeufe/${laufId}`;
      const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow"
      };

      fetch(endPoint, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched Lauf:', data);
          // Handle the fetched data as needed
        })
        .catch(error => {
          console.error('Error fetching Lauf:', error);
        });
    }
  }
});
// defineProps<{
//     title: string
// }>()

// const datumField: Ref<Date> = ref(new Date(''))
// const artField = ref('')
// const titelField = ref('')
// const distanzField = ref(0)
// const beschreibungField = ref('')
// const statusField = ref(false)

// const id = ref<string | undefined>(undefined);
// export type einzToDoLauf = { id?: number, titel: string, datum: Date, art: string, distanz: number, beschreibung: string, status: boolean }

// // TODO: getLauf(id){}
// function getLauf(laufId: number){
//     // var id = router.currentRoute.value.params;
//     // console.log('ID', id);
    
//     // const endPoint = `http://localhost:8080/alleLaeufe/${laufId}`;
//     // const requestOptions: RequestInit = {
//     //     method: 'GET',
//     //     redirect: "follow"
//     // };
//     // fetch(endPoint, requestOptions)
//     // .then(response => response.json())
//     // .then(result => result.forEach((el: einzLauf) => {}))

// }
// // TODO: saveLauf(id){} then go back to startseite-laufer with actualized list
// function saveLauf(laufId: number) {
//     // const endPoint = `http://localhost:5432/alleLaeufe/${laufId}`;
//     const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
//     const endPoint = baseUrl + '/alleLaeufe/${laufId}';
//     const d = {
//         datum: datumField.value,
//         art: artField.value,
//         titel: titelField.value,
//         distanz: distanzField.value,
//         zeit: zeitField.value,
//         gefuehl: gefuehlField.value,
//         aufwand: aufwandField.value,
//         beschreibung: beschreibungField.value,
//         schmerz: schmerzField.value
//     }
// }
// // TODO: deleteLauf(id){} then go back to startseite-laufer with actualized list

// function createLauf() {
//     // const endPoint = 'http://localhost:5432/lauf';
//     const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
//     const endPoint = baseUrl + '/lauf}';
//     const neuLauf: Lauf = {
//         datum: datumField.value,
//         art: artField.value,
//         titel: titelField.value,
//         distanz: distanzField.value,
//         zeit: zeitField.value,
//         gefuehl: gefuehlField.value,
//         aufwand: aufwandField.value,
//         beschreibung: beschreibungField.value,
//         schmerz: schmerzField.value
//     }
//     const requestOptions: RequestInit = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(neuLauf)
//     }
//     fetch(endPoint, requestOptions)
//     .then(r => r.json())
//     .then(nL => {
//         console.log('Success: ', nL);
//         router.push({ name: 'Startseite Laufer' });
//     })
//     .catch(error => console.log('error', error));
// }
// onMounted(() => {
//     const urlParts = window.location.pathname.split('/');
//     const potentialId = urlParts.pop();
//     id.value = /^\d+$/.test(potentialId || '') ? potentialId : undefined;
//     if (id){
//         console.log('lauf Id: ', id.value);
//     } else {
//         console.log('error');
        
//     }
    
// })


</script>

<template>
        <!-- <h3> {{ title }}</h3> -->
        <!-- <div>
            <input v-model="datumField" placeholder="Datum" type="date">
            <input v-model="artField" placeholder="Art" type="text">
            <input v-model="titelField" placeholder="Titel" type="text">
            <input v-model="distanzField" placeholder="Distanz" type="number">
            <input v-model="zeitField" placeholder="Zeit" type="text">
            <input v-model="gefuehlField" placeholder="Gefuehl" type="text">
            <input v-model="aufwandField" placeholder="Aufwand" type="number">
            <input v-model="beschreibungField" placeholder="Beschreibung" type="text">
            <input v-model="schmerzField" placeholder="Schmerz" type="text">
            <button type="button" @click="createLauf()">Speichern</button>
            <button type="button" @click="createLauf()">Löschen</button>
        </div> -->
    <!-- <div>
    <lauf-item v-for="lauf in alleLaeufe" :key="lauf.id" :laufId="lauf.id" @click="handleLaufClick" />
  </div> -->
</template>