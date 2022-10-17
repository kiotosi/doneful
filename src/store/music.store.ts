import { defineStore } from 'pinia';
import { getPlaylist } from '../services/music';
import { MusicStoreStates } from '../types/musicStore.types';

const useMusicStore = defineStore('music', {
  state: (): MusicStoreStates => {
    return {
      playlist: []
    };
  },
  getters: {

  },
  actions: {
    async getPlaylist(): Promise<void> {
      this.playlist = await getPlaylist();
    }
  }
});
export default useMusicStore; 
