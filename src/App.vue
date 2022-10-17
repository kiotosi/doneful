<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import ConstructionScreen from './screen/ConstructionScreen.vue';
import LoadingScreen from './screen/LoadingScreen.vue';
import { mapActions } from 'pinia';
import useMusicStore from './store/music.store';
import ContentScreen from './screen/ContentScreen.vue';

export default defineComponent({
  components: {
    ConstructionScreen,
    LoadingScreen,
    ContentScreen
  },
  setup() {

    // Store
    const musicStore = useMusicStore();

    // Refs
    const isDevelopment = ref(false);
    const isLoading = ref(true);

    /* Loading screen hiding too fast
     * To solve it - we add fake loading time to hide the screen
     * If playlist was loaded less than 2s, then we add 3 seconds to setTimeout()
     */
    musicStore.$onAction(({ name, after, onError }) => {

      if (name !== 'getPlaylist') {
        return;
      }

      const startTime = Date.now();

      // After finishing of work - calculate if we need additional time for fake loading
      after(() => {
        const finalTime = Date.now();
        if (finalTime - startTime < 2000) {
          setTimeout(() => {
            isLoading.value = false;
          }, 2000);
          return;
        }

        isLoading.value = false;
      });


      onError((err) => {
        console.error(err);
        isLoading.value = false;
      });
    });

    return {
      isDevelopment, isLoading
    };
  },
  async mounted() {

    // Getting the playlist
    this.getPlaylist()
      .catch((err) => {
        console.error(err);
        console.log('Loaded without music :(');
        this.isLoading = false;
      });
  },
  methods: {
    ...mapActions(useMusicStore, ['getPlaylist'])
  },
});
</script>

<template>
  <div class="app-wrapper">
    <construction-screen
      v-if="isDevelopment"
      text="Development in progress"
    />
    <content-screen v-else-if="!isLoading" />
    <loading-screen v-show="isLoading" />
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  padding: var(--space-xl) var(--space-mega);
}
</style>
