<template>
  <div class="lauf-item">
    <div class="lauf-item__content">
      <h3 class="lauf-item__heading">
        <slot name="heading" />
      </h3>
      <p class="lauf-item__description">
        <slot />  <!-- This is the default slot -->
      </p>
    </div>
    <button class="lauf-item__button" @click="$emit('click')">X</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'lauf-item',
}
// console.log("enter lauf-item component")
// export default {
//   data() {
//     return {
//       laufDieserWoche: true,
//       tage: [
//         { heading: 'Montag', description: '50 Läufer', km: '10 km', feeling: 'Gut' },
//         { heading: 'Dienstag', description: '20 Trainer', km: '15 km', feeling: 'Müde' },
//         { heading: 'Mittwoch', description: '50 km', km: '20 km', feeling: 'Stark' },
//         { heading: 'Donnerstag', description: '120 Std', km: '25 km', feeling: 'Erschöpft' },
//         { heading: 'Freitag', description: '120 Std', km: '30 km', feeling: 'Gut' },
//         { heading: 'Samstag', description: '120 Std', km: '35 km', feeling: 'Super' },
//         { heading: 'Sonntag', description: '120 Std', km: '40 km', feeling: 'Erholt' }
//       ]
//     }
//   },
//   computed: {
//     filteredTage() {
//       return this.tage.map(tag => {
//         if (this.laufDieserWoche) {
//           return {
//             heading: tag.heading,
//             description: tag.description,
//             km: tag.km,
//             feeling: tag.feeling
//           };
//         } else {
//           return {
//             heading: tag.heading,
//             description: tag.description,
//             km: tag.km
//           };
//         }
//       });
//     }
//   }
// }
// console.log("done lauf-item component");
</script>

<style scoped>
.lauf-item {
  position: relative;
  display: inline-flex;
  width: 13%;
  height: 270px;
  margin-top: 2rem;
  border: 2px solid grey;
  border-radius: 2px;
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
  /* margin-left: 1rem; */
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