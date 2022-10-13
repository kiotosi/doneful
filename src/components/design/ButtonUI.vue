<template>
  <div
    class="button"
    :class="{'button_acitve': isActive}"
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
  
}
</style>