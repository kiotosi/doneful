<script lang="ts">
import { defineComponent } from 'vue';
import LoadingScreen from './screen/LoadingScreen.vue';
import ConstructionScreen from './screen/ConstructionScreen.vue';

export default defineComponent({ components: { ConstructionScreen } });
</script>

<template>
  <div class="app-wrapper">
    <construction-screen text="Development in progress" />
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
}
</style>
