<template>
  <div
    class="button"
    :class="{'button_active': isActive}"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean
    }
  }
});
</script>

<style scoped lang="scss">
.button {
  padding: var(--space-xss) var(--space-sm);
  background-color: var(--color-blue-light);
  color: var(--color-neutral-700);
  width: fit-content;
  display: inline-block;
  border-radius: var(--br-alt);
  
  &_active {
    background-color: var(--color-blue-normal);
    color: var(--color-neutral-10);
  }
}
</style>