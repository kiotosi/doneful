<template>
  <div class="timeset">
    <div class="timeset__timer">
      <span class="timeset__text">{{ $t('timeset.focusTime[0]') }}</span>
      <TimesetInputUI
        :value="workTime"
        @write="((v: number) => timerStore.workTime = v)"
      />
      <span class="timeset__text">{{ $t('timeset.focusTime[1]') }}</span>
      <TimesetInputUI
        :value="restTime"
        @write="((v: number) => timerStore.restTime = v)"
      />
      <span class="timeset__text">{{ $t('timeset.focusTime[2]') }}</span>
    </div>

    <div class="timeset__line" />

    <div class="timeset__break">
      <span class="timeset__text">{{ $t('timeset.bigBreak[0]') }} </span>
      <span
        class="timeset__toggle-text"
        :class="{'timeset__toggle-text_active': isBreakActive}"
        @click="() => timerStore.toggleActiveBreak()"
      > {{ $t('timeset.bigBreak[1]') }} </span>
      <span class="timeset__text">{{ $t('timeset.bigBreak[2]') }}</span>
      <TimesetInputUI
        :value="breakAfterSessions"
        @write="((v: number) => timerStore.breakAfterSessions = v)"
      />
      <span class="timeset__text">{{ $t('timeset.bigBreak[3]') }}</span>
      <TimesetInputUI
        :value="breakTime"
        @write="((v: number) => timerStore.bigBreakTime = v)"
      />
      <span class="timeset__text">{{ $t('timeset.bigBreak[4]') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useTimerStore from '../store/timer.store';
import TimesetInputUI from './design/TimesetInputUI.vue';

const timerStore = useTimerStore();
const workTime = computed(() => timerStore.workTime);
const restTime = computed(() => timerStore.restTime);
const isBreakActive = computed(() => timerStore.isBigBreakActive);
const breakTime = computed(() => timerStore.bigBreakTime);
const breakAfterSessions = computed(() => timerStore.breakAfterSessions);
</script>

<style scoped lang="scss">
.timeset {
  @include popupUI;

  &__line {
    margin: var(--space-xs) 0;
    height: 1px;
    border-top: var(--color-neutral-70) 1px dashed;
  }

  &__toggle-text {
    cursor: pointer;
    margin: 0 var(--space-xs);
    color: var(--color-neutral-100);

    &_active {
      color: var(--color-neutral-800)
    }
  }
}
</style>