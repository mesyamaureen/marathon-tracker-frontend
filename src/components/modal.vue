<template>
    <div v-if="isOpen" class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <slot></slot>
        <button class="close-button" @click="close">X</button>
        <button type="button" @click="$emit('save')">Speichern</button>
        <button type="button" @click="$emit('delete')">Löschen</button>
      </div>
    </div>
</template>
  
  <script lang="ts">
  export default {
    name: 'Modal',
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      save() {
      this.$emit('save');
      },
    }
  }
  </script>
  
  
  <style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>