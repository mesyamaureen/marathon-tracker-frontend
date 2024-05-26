<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { type Lauf } from './alle-laeufe.vue';
import router from '@/router';
defineProps<{
    title: string
}>()

const datumField: Ref<Date> = ref(new Date(''))
const artField = ref('')
const titelField = ref('')
const distanzField = ref(0)
const zeitField= ref('')
const gefuehlField = ref('')
const aufwandField= ref(0)
const beschreibungField = ref('')
const schmerzField = ref('')

function createLauf() {
    const endPoint = 'http://localhost:8080/lauf';
    const neuLauf: Lauf = {
        datum: datumField.value,
        art: artField.value,
        titel: titelField.value,
        distanz: distanzField.value,
        zeit: zeitField.value,
        gefuehl: gefuehlField.value,
        aufwand: aufwandField.value,
        beschreibung: beschreibungField.value,
        schmerz: schmerzField.value
    }
    const requestOptions: RequestInit = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(neuLauf)
    }
    fetch(endPoint, requestOptions)
    .then(r => r.json())
    .then(nL => {
        console.log('Success: ', nL);
        router.push({ name: 'Startseite Laufer' });
    })
    .catch(error => console.log('error', error));
}
</script>

<template>
    <RouterView>
        <h3> {{ title }}</h3>
        <div>
            <input v-model="datumField" placeholder="Datum" type="date">
            <input v-model="artField" placeholder="Art" type="text">
            <input v-model="titelField" placeholder="Titel" type="text">
            <input v-model="distanzField" placeholder="Distanz" type="number">
            <input v-model="zeitField" placeholder="Zeit" type="text">
            <input v-model="gefuehlField" placeholder="Gefuehl" type="text">
            <input v-model="aufwandField" placeholder="Aufwand" type="number">
            <input v-model="beschreibungField" placeholder="Beschreibung" type="text">
            <input v-model="schmerzField" placeholder="Schmerz" type="text">
            <button type="button" @click="createLauf()">Erstellen</button>
        </div>
    </RouterView>
</template>