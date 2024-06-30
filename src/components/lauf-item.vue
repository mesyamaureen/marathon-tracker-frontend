<template>
  <div class="lauf-item">
    <div class="lauf-item__content">
      <h3 class="lauf-item__heading">
        <slot name="heading" />
      </h3>
      <p class="lauf-item__description">
        <slot /> 
      </p>
    </div>
    <button class="lauf-item__button" @click="$emit('edit', laufId)">
      <font-awesome-icon :icon="['fas', 'edit']" />
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'lauf-item',
  props: {
    laufId: {
      type: Number
    }
  }
}
</script>

<style scoped>
.lauf-item {
  position: relative;
  display: inline-flex;
  width: 13%;
  height: 270px;
  margin-top: 2rem;
  border: 2px solid grey;
  border-radius: 8px;
}

.lauf-item__icon {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

.lauf-item__content {
  flex: 1;
}

.lauf-item__heading {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

.lauf-item__description {
  font-size: large;
  font-weight: 300;
  color: var(--color-text);
}

.lauf-item__button {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--color-background);
  color: var(--color-text);
  border: 0;
  padding: 0.5rem;
  border-radius: 2px;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .lauf-item {
    margin-top: 0;
    padding: 0.4rem 0 1rem 2rem;
    border-radius: 8px;
  }

  .lauf-item__icon {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: #ffffff;
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }
}
</style>