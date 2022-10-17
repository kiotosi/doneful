<template>
  <div class="content">
    <div class="content__row">
      <TodoBase class="content__todo" />
      <MusicBase class="content__music" />
    </div>
    <div class="content__row">
      <div>
        <TimesetBase class="content__timeset" />
        <PagerBase class="content__pager" />
      </div>
      <TimerBase class="content__timer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoBase from '../components/TodoBase.vue';
import MusicBase from '../components/MusicBase.vue';
import TimesetBase from '../components/TimesetBase.vue';
import PagerBase from '../components/PagerBase.vue';
import TimerBase from '../components/TimerBase.vue';

export default defineComponent({
  components: { TodoBase, MusicBase, TimesetBase, PagerBase, TimerBase }
});
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  @include upon-desktop {
    width: 100%;

    &__row {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    &__row + &__row {
      margin-top: var(--space-xl);
    }

    &__todo {
      max-width: 450px;
      max-height: 255px;
      width: 100%;
      height: 100%;
    }

    &__music {
      max-width: 811px;
      max-height: 255px;
      margin-left: var(--space-xl);
      width: 100%;
      height: 100%;

    }

    &__timeset {
      max-width: 574px;
      width: 100%;
    }

    &__timer {
      max-width: 687px;
      margin-left: var(--space-xl);
      width: 100%;
    }

    &__pager {
      max-width: 574px;
      margin-top: var(--space-xl);
      width: 100%;
    }
  }
}
</style>