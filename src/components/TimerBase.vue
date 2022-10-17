<template>
  <div class="timer">
    <div class="timer__time">
      {{ formattedMinutes }}:{{ formattedSeconds }}
    </div>
    <div
      class="timer__toggle"
      @click="toggleTimer"
    >
      <PhosphorIcon
        v-if="isActive"
        icon-name="pause-circle"
        :size="64"
      />
      <PhosphorIcon
        v-else
        icon-name="play-circle"
        :size="64"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PhosphorIcon from './design/PhosphorIcon.vue';
import useTimerStore from '../store/timer.store';
import { mapActions, mapState } from 'pinia';
import { formatTime } from '../utils/time';
import { requestNotificationPermission, sendNotification } from '../utils/notification';
import { TIMER_MODE } from '../types/timer.types';

export default defineComponent({
  name: "TimerBase",
  components: { PhosphorIcon },
  data() {
    return {
      minutes: 0,
      seconds: 0,
      isActive: false,
      currentTimer: -1
    };
  },
  computed: {
    ...mapState(useTimerStore, ['getTime', 'currentMode']),
    formattedMinutes() {
      return formatTime(this.minutes);
    },
    formattedSeconds() {
      return formatTime(this.seconds);
    },
  },
  watch: {
    getTime() {
      if (this.currentTimer === -1) {
        this.minutes = this.getTime;
      }
    }
  },
  mounted() {
    this.minutes = this.getTime;
  },
  methods: {

    /**
     * Toggle timer
     */
    async toggleTimer(): Promise<void> {

      if (this.isActive) {
        this.stopTimer();
      } else {
        await this.startTimer();
      }

      this.isActive = !this.isActive;
    },

    /**
     * Start the timer
     */
    async startTimer(): Promise<void> {

      // Requesting notification permission
      await requestNotificationPermission();

      if (this.currentTimer === -1) {
        this.minutes--;
        this.seconds = 59;
      }

      this.currentTimer = setInterval(this.timerCallback, 1000);
    },

    /**
     * Stop the timer
     */
    stopTimer(): void {
      clearInterval(this.currentTimer);
    },

    /**
     * Timer callback
     */
    timerCallback(): void {
      
      // Decrement seconds
      if (this.seconds > 0) {
        this.seconds--;
        return;
      } 

      // Decrement minutes
      if (this.minutes > 0) {
        this.seconds = 59;
        this.minutes--;
        return;
      }

      // Change mode if time is our
      this.toggleMode();
      this.sendNotification();
      this.minutes = this.getTime;
      this.seconds = 0;
    },

    /**
     * Send notification about timer work
     */
    sendNotification() {
      let text: string;

      if (this.currentMode === TIMER_MODE.REST_MODE) {
        text = this.$t('notification.restMode');
      } else {
        text = this.$t('notification.workMode');
      }

      sendNotification(text);
    },
    ...mapActions(useTimerStore, ['toggleMode'])
  },
});
</script>

<style scoped lang="scss">
.timer {
  @include popupUI;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: stretch;

  &__time {
    font-size: var(--fz-timer);
    font-weight: 600;
  }

  &__toggle {
    margin-top: var(--space-md);
    cursor: pointer;
  }
}
</style>