<template>
  <i :style="'font-size: ' + size + 'px'" :class="`ph-${name}`" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 16
    }
  }
});
</script>

<style scoped lang="scss"></style>