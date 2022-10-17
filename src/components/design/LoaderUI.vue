<template>
  <div
    class="loader"
    :style="style"
  >
    <PhosphorIcon
      icon-name="loader"
      :size="loaderSize"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PhosphorIcon from './PhosphorIcon.vue';

export default defineComponent({
  name: "LoaderUI",
  components: { PhosphorIcon },
  props: {
    animationDuration: {
      required: false,
      default: 2,
      type: Number
    },
    loaderSize: {
      required: false,
      default: 16,
      type: Number
    }
  },
  computed: {
    style() {
      return `
        animation-duration: ${this.$props.animationDuration} + s;
      `;
    }
  },
});
</script>

<style scoped lang="scss">
.loader {
  animation: spin 2s ease-in-out 0 infinite forwards;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>