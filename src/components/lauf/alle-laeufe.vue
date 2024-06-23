// template
<template>
<div class="title">
      <h1>Laufübersicht dieser Woche</h1>
    </div>

    <!-- <div class="items">
      <itemBox v-for="(Lauf, index) in alleLaeufe" :key="index">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </template>
        <template #heading>{{ Lauf.titel }}</template>
        <p style="padding: 20px 0 10px 0">{{ tag.datum }}</p>
        <p style="padding-top: 10px;">{{ tag.art }}</p>
        <p style="padding-top: 10px;">{{ tag.km }} km</p> -->
        <!-- <p style="padding-top: 10px;">{{ Lauf.beschreibung }}</p>
      </itemBox>
    </div> -->

    <div>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Datum</th>
        <th>Art</th>
        <th>Titel</th>
        <th>Distanz</th>
        <th>Zeit</th>
        <th>Gefühl</th>
        <th>Aufwand</th>
        <th>Beschreibung</th>
        <th>Schmerz</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="alleLaeufe.length === 0">
        <td colspan="10">Kein Lauf</td>
      </tr>
      <tr v-for="l in alleLaeufe" :key="l.id">
        <td>{{l.id}}</td>
        <td>{{l.datum}}</td>
        <td id="art-clickable" @click="handleClick()">{{l.art}}</td>
        <td>{{l.titel}}</td>
        <td>{{l.distanz}}</td>
        <td>{{l.zeit}}</td>
        <td>{{l.gefuehl}}</td>
        <td>{{l.aufwand}}</td>
        <td>{{l.beschreibung}}</td>
        <td>{{l.schmerz}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

// script
<script setup lang="ts">
import router from "@/router";
import { onMounted, ref, type Ref } from "vue";
import itemBox from '@/components/lauf-item.vue';
import tage from '@/components/lauf-item.vue';

defineProps<{
    title: string
}>()

function handleClick() {
  router.push('/lauf') // TODO: change to route 'Lauf'
}

export type Lauf = { id?: number, titel: string, datum: Date, art: string, distanz: number, zeit: string, gefuehl: string, aufwand: number, beschreibung: string, schmerz: string }
const alleLaeufe: Ref<Lauf[]> = ref([]);

function loadLaeufe() {
    const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
    console.log('baseUrl', baseUrl);
    
    const endPoint = baseUrl + '/alleLaeufe';
    const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow"
    };
    console.log('requestOptions:', requestOptions);
    
    fetch(endPoint, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming `data` is an array of Lauf objects
            alleLaeufe.value = data; // Update alleLaeufe with fetched data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // fetch(endPoint, requestOptions)
    // .then(response => response.json())
    // // .then(result => {
    // //   alleLaeufe.value = result;
    // // })
    // .then(result => result.forEach((l: Lauf) => {
    //   console.log("result", result);
      
    //     alleLaeufe.value.push(l)
    // }))
    // .catch(error => console.log('error', error))
}

onMounted(() => {
    loadLaeufe()
    
})
</script>

<style scoped>
#art-clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}

/* styling from startseite-laufer */
header {
  line-height: 1.5;
  max-height: 100vh;
  margin: 2rem 2rem 0 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.content {
  padding-left: 175px;
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.logo {
  display: flex;
  place-items: center;
  margin: 0 0 0 0;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: end;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: #ffffff;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: row;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    width: fit-content;
  }

  .logo {
    margin: 2rem 1rem 0 0;
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
  }

  nav {
    text-align: end;
    margin-left: -1rem;
    font-size: 1rem;
    display: flex;
    justify-content: end;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.circle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px; /* Adjust size as needed */
  height: 50px; /* Adjust size as needed */
  background-color: #000000; /* Change to desired color */
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem; /* Adjust font size as needed */
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    transform 0.3s;
  position: absolute;
  top: 20px;
  right: 20px;
}

.circle-button:hover {
  background-color: #0056b3; /* Change to desired hover color */
  transform: scale(1.1);
}

.circle-button:active {
  transform: scale(0.9);
}

.title {
  font-weight: 800;
  padding-top: 20px;
}
</style>
