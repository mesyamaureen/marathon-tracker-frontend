<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { type todoLauf } from '@/components/lauf/alle-laeufe.vue'
import router from '@/router';
defineProps<{
    title: string
}>()

const datumField: Ref<Date> = ref(new Date(''))
const artField = ref('')
const titelField = ref('')
const distanzField = ref(0)
const beschreibungField = ref('')
const statusField = ref(false)

function createToDoLauf() {
    // const endPoint = 'http://localhost:5432/lauf';
    const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
    const endPoint = baseUrl + '/todolauf';
    const neuerToDoLauf: todoLauf = {
        datum: datumField.value,
        art: artField.value,
        titel: titelField.value,
        distanz: distanzField.value,
        beschreibung: beschreibungField.value,
        status: statusField.value
    }
    const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(neuerToDoLauf)
    }
    fetch(endPoint, requestOptions)
    .then(r => r.json())
    .then(nTdL => {
        console.log('Success: ', nTdL);
        router.push({ name: 'Startseite Laufer' });
    })
    .catch(error => console.log('error', error));
}
</script>

<template>
        <h3> {{ title }}</h3>
        <div>
            <input v-model="datumField" placeholder="Datum" type="date">
            <input v-model="artField" placeholder="Art" type="text">
            <input v-model="titelField" placeholder="Titel" type="text">
            <input v-model="distanzField" placeholder="Distanz" type="number">
            <input v-model="beschreibungField" placeholder="Beschreibung" type="text">
            <input v-model="statusField" placeholder="Status" type="text">
            <button type="button" @click="createToDoLauf()">Erstellen</button>
        </div>
</template>