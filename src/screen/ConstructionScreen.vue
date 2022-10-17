<template>
  <div class="construction-screen">
    <PhosphorIcon
      class="construction-screen__icon"
      icon-name="warning"
      icon-style="bold"
      :size="96"
    />
    <h1 class="construction-screen__title">
      {{ $t('developmentNote') }}
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PhosphorIcon from '../components/design/PhosphorIcon.vue';

export default defineComponent({
  components: { PhosphorIcon },
  props: {
    text: {
      type: String,
      required: true
    }
  },
});
</script>

<style scoped lang="scss">
.construction-screen {
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
</style>