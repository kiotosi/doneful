import { defineStore } from 'pinia';
import { TimerStoreStates, TIMER_MODE } from '../types/timer.types';

// REMOVE
// Time constants
// const MILLISECONDS_ONE_SECOND = 1000;
// const MILLISECONDS_ONE_MINUTE = 60 * MILLISECONDS_ONE_SECOND;

const useTimerStore = defineStore('timer', {
  state: (): TimerStoreStates => {
    return {
      workTime: 25,
      restTime: 5,
      isBigBreakActive: false,
      breakAfterSessions: 3,
      bigBreakTime: 35,
      currentMode: TIMER_MODE.WORK_MODE
    };
  },
  getters: {
    getTime(): number {
      if (this.currentMode === TIMER_MODE.WORK_MODE) {
        return this.workTime;
      }
      return this.restTime;
    }
  },
  actions: {
    /**
     * Toggle current timer mode
     */
    toggleMode(): void {
      if (this.currentMode === TIMER_MODE.WORK_MODE) {
        this.currentMode = TIMER_MODE.REST_MODE;
      } else {
        this.currentMode = TIMER_MODE.WORK_MODE;
      }
    },

    /**
     * Toggle boolean value of big break activation
     */
    toggleActiveBreak(): void {
      this.isBigBreakActive = !this.isBigBreakActive;
    }
  }
});

export default useTimerStore; 