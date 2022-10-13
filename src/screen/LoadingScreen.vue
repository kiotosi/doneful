<template>
  <div class="loading-screen">
    <div class="loading-screen__icon">
      <PhosphorIcon v-if="Math.random() > 0.99" name="eye-bold" :size="96" />
      <PhosphorIcon v-else name="eye-closed-bold" :size="96" />
    </div>
    <div class="loading-screen__title">
      Doneful
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PhosphorIcon from '../components/design/PhosphorIcon.vue';

export default defineComponent({
  components: { PhosphorIcon }
});
</script>

<style scoped lang="scss">
.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  &__icon {
    color: var(--color-neutral-700);
    animation: levitate 2s ease-in infinite;
  }

  &__title {
    margin-top: var(--space-lg);
    font-size: var(--fz-hero);
    font-weight: 600;
    user-select: none;
    animation: flick 2.5s infinite forwards ease-in;
  }
}

@keyframes levitate {
  from {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-5px, -5px);
  }

  50% {
    transform: translate(0, -10px);
  }

  75% {
    transform: translate(5px, -5px);
  }

  to {
    transform: translate(0, 0);
  }
}

@keyframes flick {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.8;
  }
}
</style>
