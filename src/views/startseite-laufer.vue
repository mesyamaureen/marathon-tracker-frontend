<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import alleLaeufe from '@/components/lauf/alle-laeufe.vue';
</script>

<template>
  <main>
    <div>
      <alleLaeufe title="Läufe"/>
    </div>
  </main>
</template>

<style scoped>
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
