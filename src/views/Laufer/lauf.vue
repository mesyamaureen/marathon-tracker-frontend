<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import EinzLauf from '@/components/lauf/einz-lauf.vue';
</script>

<template>
    <main>
        <EinzLauf title="Einzel Lauf" />
    </main>
</template>


// if there's an overruled css, add here
<style scoped>
header-title {
  line-height: 1.5;
  max-height: 100vh;
  margin: 2rem 2rem 0 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
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
  header-title {
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

  header-title .wrapper {
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
</style>