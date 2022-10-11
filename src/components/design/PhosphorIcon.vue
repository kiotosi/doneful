<template>
  <i :class="`ph-${name}`" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped lang="scss"></style>