import { defineStore } from 'pinia';
import { MusicStoreStates } from './types/musicStore.types';

const useMusicStore = defineStore('music', {
  state: (): MusicStoreStates => {
    return {
      currentMusicID: 0
    };
  },
  getters: {

  },
  actions: {

  }
});
export default useMusicStore; 
