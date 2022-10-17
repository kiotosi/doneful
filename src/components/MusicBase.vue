<template>
  <div class="music-player">
    <MusicItem
      v-for="(track, id) in playlist"
      :key="id"
      class="music-player__item"
      :author="track.author"
      :genre="track.genre"
      :is-active="id === currentTrackId"
      :title="track.title"
      :track-state=" id === currentTrackId && isLoading ? 'loading' : isPlaying && id === currentTrackId ? 'playing' : 'paused'"
      :track-link="track.originalLink"
      @select-track="selectTrack(id)"
      @toggle-play="togglePlay"
    />
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
import useMusicStore from '../store/music.store';
import { downloadTrack } from '../services/music';
import { TrackStack } from '../types/music.types';
import MusicItem from './MusicItem.vue';

export default defineComponent({
  name: "MusicBase",
  components: { MusicItem },
  data() {
    return {
      
      // Current track index in playlist
      currentTrackId: -1,
      
      // Current track
      currentTrack: null as null | HTMLAudioElement,
      
      // Memoisation of tracks
      trackStack: [] as TrackStack,
      
      // Is current track already playing
      isPlaying: false,
      
      // Is current track loading
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useMusicStore, ["playlist"]),
  },
  methods: {
    togglePlay(): void {

      // If we try to play track, that already active - toggle it
      if (this.currentTrack) {

        if (this.isPlaying) {
          this.currentTrack.pause();
        } else {
          this.currentTrack.play();
        }

        this.isPlaying = !this.isPlaying;
      }
    },
    /**
     * Download track from server
     * @async
     * @param id ID of track
     */
    async selectTrack(id: number) {

      // Reset old track
      if (this.currentTrack) {
        this.currentTrack.pause();
        this.currentTrack.currentTime = 0;
      }

      // Change current track, because we choosed a new one
      this.currentTrackId = id;

      // Memoisation
      // If track is already in Track Stack - we already have it in memory.
      // So we can play it without download.
      const trackStackIndex = this.trackStack.findIndex(track => track.id === id);

      if (trackStackIndex !== -1) {
        this.isPlaying = true;
        this.currentTrack = this.trackStack[trackStackIndex].track;
        this.currentTrack.play();
        return;
      }

      // Download track and play it
      try {
        this.isLoading = true;
        
        // Download track
        const track = await downloadTrack(this.playlist[id].link);
        
        // Play track
        this.onTrackReady(id, track);
      
        // Play next track, when current is ended
        track.addEventListener('ended', this.onNextTrack);
      } catch (e) {

        // If we can't play our track - download next
        this.onErrorDownloadingTrack(e as ErrorEvent);
      }
    },
    /**
     * Increment the counter of id for tracks
     */
    incrementCurrentTrackId() {
      if (this.currentTrackId + 1 >= this.playlist.length) {
        this.currentTrackId = 0;
        return;
      }
      this.currentTrackId += 1;
    },

    /**
     * Pre-actions for next track
     */
    onNextTrack(): void {
      this.isPlaying = false;
      this.incrementCurrentTrackId();
      this.selectTrack(this.currentTrackId);
    },

    /**
     * Actions when track is loaded and ready to play
     * @param id - ID of loaded track
     * @param track - Loaded track
     */
    onTrackReady(id: number, track: HTMLAudioElement): void {
      
      // If track stack doesn't have this track - push it
      if (!this.trackStack.some(track => track.id === id)) {
        this.trackStack.push({ track, id });
      }

      this.isLoading = false;
      this.isPlaying = true;
      this.currentTrack = track;

      // If current track, that ready is active - play it
      if (this.currentTrackId === id && this.isPlaying) {
        track.play();
      }
    },

    /**
     * Actions when we can't load current track
     * @param ev Error event on loading new track
     */
    onErrorDownloadingTrack(ev: ErrorEvent): void {
      console.error(ev);
      this.incrementCurrentTrackId();
      this.currentTrack = null;
      this.isLoading = false;
      this.selectTrack(this.currentTrackId);
    }
  },
});
</script>

<style scoped lang="scss">
.music-player {
  @include popupUI;
  overflow-y: auto;
  scroll-behavior: smooth;

  &__item + &__item {
    margin-top: var(--space-md);
  }
}
</style>