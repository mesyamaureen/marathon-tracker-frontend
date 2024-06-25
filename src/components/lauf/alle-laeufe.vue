// template
<template>
  <div class="title">
    <h1>Laufübersicht dieser Woche</h1>
  </div>

  <div>
    <h2>To Do Läufe</h2>
    <div class="items">
      <itemBox
        v-for="(ToDoLauf, index) in currentWeekToDoLäufe"
        :key="index"
        @edit="openModalToDoLauf(ToDoLauf)"
      >
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
        <template #heading>{{ ToDoLauf.datum }}</template>
        <p style="padding: 20px 0 10px 0">{{ ToDoLauf.titel }}</p>
        <p style="padding-top: 10px">{{ ToDoLauf.art }}</p>
        <p style="padding-top: 10px">{{ ToDoLauf.distanz }} km</p>
        <p style="padding-top: 10px">{{ ToDoLauf.beschreibung }}</p>
      </itemBox>
      <Modal
        :isOpen="isToDoLaufModalOpen"
        @close="closeModalToDoLauf"
        @save="saveToDoLauf"
        @delete="deleteToDoLauf"
      >
        <div class="modal-content-detail">
          <div v-if="selectedToDoLauf">
            <h4>To Do Lauf bearbeiten</h4>
            <input v-model="selectedToDoLauf.datum" placeholder="YYYY-MM-DD" type="date" />
            <input v-model="selectedToDoLauf.titel" placeholder="Titel" type="text" />
            <input v-model="selectedToDoLauf.art" placeholder="Art" type="text" />
            <input v-model="selectedToDoLauf.distanz" placeholder="Distanz" type="number" />
            <input v-model="selectedToDoLauf.beschreibung" placeholder="Beschreibung" type="text" />
          </div>
        </div>
      </Modal>
    </div>
  </div>

  <div>
    <h2>Läufe</h2>
    <div class="items">
      <itemBox v-for="(Lauf, index) in currentWeekLäufe" :key="index" @edit="openModalLauf(Lauf)">
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
        <template #heading>{{ Lauf.datum }}</template>
        <p style="padding: 20px 0 10px 0">{{ Lauf.titel }}</p>
        <p style="padding-top: 10px">{{ Lauf.art }}</p>
        <p style="padding-top: 10px">{{ Lauf.distanz }} km</p>
        <p style="padding-top: 10px">{{ Lauf.beschreibung }}</p>
      </itemBox>
      <Modal :isOpen="isLaufModalOpen" @close="closeModalLauf" @save="saveLauf" @delete="deleteLauf">
        <div class="modal-content-detail">
          <div v-if="selectedLauf">
            <h4>To Do Lauf bearbeiten</h4>
            <input v-model="selectedLauf.datum" placeholder="YYYY-MM-DD" type="date" />
            <input v-model="selectedLauf.titel" placeholder="Titel" type="text" />
            <input v-model="selectedLauf.art" placeholder="Art" type="text" />
            <input v-model="selectedLauf.distanz" placeholder="Distanz" type="number" />
            <input v-model="selectedLauf.zeit" placeholder="Zeit" type="text" />
            <input v-model="selectedLauf.gefuehl" placeholder="Gefühl" type="text" />
            <input v-model="selectedLauf.aufwand" placeholder="Aufwand" type="number" />
            <input v-model="selectedLauf.beschreibung" placeholder="Beschreibung" type="text" />
            <input v-model="selectedLauf.schmerz" placeholder="Schmerz" type="text" />
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { onMounted, ref, type Ref, computed } from 'vue'
import itemBox from '@/components/lauf-item.vue'
import Modal from '@/components/modal.vue'
import axios from 'axios'

defineProps<{
  title: string
}>()

function handleClick() {
  router.push('/lauf') // TODO: change to route 'Lauf'
}

export type Lauf = {
  id?: number
  titel: string
  datum: Date
  art: string
  distanz: number
  zeit: string
  gefuehl: string
  aufwand: number
  beschreibung: string
  schmerz: string
}
const isToDoLaufModalOpen = ref(false)
const isLaufModalOpen = ref(false)
const alleLaeufe: Ref<Lauf[]> = ref([])
const currentWeekLäufe = computed(() => {
  const { startDate, endDate } = getCurrentWeekRange()
  return alleLaeufe.value.filter((lauf) => {
    const laufDate = new Date(lauf.datum)
    return laufDate >= startDate && laufDate <= endDate
  })
})
const selectedLauf = ref<Lauf | null>(null)
export type todoLauf = {
  id?: number
  titel: string
  datum: Date
  art: string
  distanz: number
  beschreibung: string
  status: boolean
}
const alleToDoLaeufe: Ref<todoLauf[]> = ref([])
const currentWeekToDoLäufe = computed(() => {
  const { startDate, endDate } = getCurrentWeekRange()
  return alleToDoLaeufe.value.filter((todolauf) => {
    const todolaufDate = new Date(todolauf.datum)
    return todolaufDate >= startDate && todolaufDate <= endDate
  })
})
const selectedToDoLauf = ref<todoLauf | null>(null)

const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL

function openModalLauf(lauf: Lauf) {
  selectedLauf.value = lauf
  isLaufModalOpen.value = true
}

function openModalToDoLauf(todoLauf: todoLauf) {
  selectedToDoLauf.value = todoLauf
  isToDoLaufModalOpen.value = true
}

function closeModalLauf() {
  isLaufModalOpen.value = false
  selectedLauf.value = null
}
function closeModalToDoLauf() {
  isToDoLaufModalOpen.value = false
  selectedToDoLauf.value = null
}

function loadLaeufe() {
  const endPoint = baseUrl + '/alleLaeufe'
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  fetch(endPoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alleLaeufe.value = result
    })
    .catch((error) => console.log('error', error))
}

function loadToDoLaeufe() {
  const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL

  const endPoint = baseUrl + '/alleToDoLaufs'
  const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  }

  fetch(endPoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alleToDoLaeufe.value = result
    })
    .catch((error) => console.log('error', error))
}

function saveToDoLauf() {
  console.log('into save Todo Lauf')
  console.log('selectedToDoLauf: ', selectedToDoLauf.value)

  if (selectedToDoLauf.value) {
    try {
      console.log('fetching starts')

      axios.put<todoLauf>(
        `${baseUrl}/alleToDoLaufs/${selectedToDoLauf.value.id}`,
        selectedToDoLauf.value
      )
      console.log('fetching done')

      closeModalToDoLauf()
    } catch (error) {
      console.error('Failed to save the To Do Lauf:', error)
    }
  }
}


function saveLauf() {
  console.log('into save Lauf')
  console.log('selected Lauf: ', selectedLauf.value)

  if (selectedLauf.value) {
    try {
      console.log('fetching starts')

      axios.put<Lauf>(`${baseUrl}/alleLaeufe/${selectedLauf.value.id}`, selectedLauf.value)
      console.log('fetching done')

      closeModalToDoLauf()
    } catch (error) {
      console.error('Failed to save the Lauf:', error)
    }
  }
}

function deleteToDoLauf() {
  console.log('Entered deleteToDoLauf function')
  console.log('selectedToDoLauf: ', selectedToDoLauf.value)

  if (selectedToDoLauf.value) {
    try {
      console.log('Starting API call to delete ToDoLauf')
      axios.delete(`${baseUrl}/alleToDoLaufs/${selectedToDoLauf.value.id}`)
      console.log('API call successful, closing modal')
      closeModalToDoLauf()

      // Check if selectedToDoLauf is not null before filtering
      if (selectedToDoLauf.value) {
        // Remove the deleted ToDoLauf from the alleToDoLaeufe array
        alleToDoLaeufe.value = alleToDoLaeufe.value.filter(
          (todolauf) => todolauf.id !== selectedToDoLauf.value?.id
        )
      }
      loadToDoLaeufe() // Reload ToDoLäufe to update the list after deletion
    } catch (error) {
      console.error('Failed to delete the To Do Lauf:', error)
    }
  } else {
    console.log('No ToDoLauf selected')
  }
}

function deleteLauf() {
  console.log('Entered deleteLauf function')
  console.log('selected Lauf: ', selectedLauf.value)

  if (selectedLauf.value) {
    try {
      console.log('Starting API call to delete Lauf')
      axios.delete(`${baseUrl}/alleLaeufe/${selectedLauf.value.id}`)
      console.log('API call successful, closing modal')
      closeModalLauf()

      // Check if selectedLauf is not null before filtering
      if (selectedLauf.value) {
        // Remove the deleted Lauf from the alleToDoLaeufe array
        alleLaeufe.value = alleLaeufe.value.filter(
          (lauf) => lauf.id !== selectedLauf.value?.id
        )
      }
      loadLaeufe() // Reload Läufe to update the list after deletion
    } catch (error) {
      console.error('Failed to delete the Lauf:', error)
    }
  } else {
    console.log('No Lauf selected')
  }
}

onMounted(() => {
  loadLaeufe()
  loadToDoLaeufe()
})

function getCurrentWeekRange() {
  const now = new Date()
  const firstDay = now.getDate() - now.getDay() + 1 // Monday as the first day of the week
  const lastDay = firstDay + 6 // Sunday as the last day of the week

  const startDate = new Date(now.setDate(firstDay))
  const endDate = new Date(now.setDate(lastDay))

  return { startDate, endDate }
}
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

.modal-content-detail {
  text-align: left;
}
</style>
