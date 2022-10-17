<template>
  <div
    class="music-item"
    :class="{'music-item_active': isActive}"
  >
    <div class="music-item__info music-info">
      <div class="music-item__title">
        {{ title }}
      </div>
      <div class="music-info__text music-item__genre">
        {{ $t('music.genre') + ': ' + genre }}
      </div>
      <div class="music-info__text music-item__author">
        {{ $t('music.author') }}: <a
          class="music-info__link"
          target="_BLANK"
          :href="trackLink"
        >{{ author }}</a>
      </div>
    </div>
    <div
      class="music-item__play-button"
      @click="toggleTrack"
    >
      <PhosphorIcon
        v-if="trackState === 'loading'"
        class="music-item__spinner"
        icon-name="circle-notch"
        :size="30"
      />
      <PhosphorIcon
        v-else-if="trackState === 'playing'"
        icon-name="pause"
        icon-style="fill"
        :size="30"
      />
      <PhosphorIcon
        v-else
        icon-name="play"
        icon-style="fill"
        :size="30"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import PhosphorIcon from './design/PhosphorIcon.vue';

export default defineComponent({
  name: "MusicItem",
  components: { PhosphorIcon },
  props: {
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean
    },
    trackState: {
      type: String as PropType<'loading' | 'playing' | 'paused'>,
      required: true
    },
    trackLink: {
      type: String,
      required: true
    },
  },
  emits: [
    'togglePlay',
    'selectTrack'
  ],
  methods: {
    toggleTrack() {
      if (this.isActive) {
        this.$emit('togglePlay');
      } else {
        this.$emit('selectTrack');
      }
    }
  }
});
</script>

<style scoped lang="scss">
$play-button-size: 50px;

.music-item {
  background-color: var(--color-neutral-700);
  color: var(--color-neutral-30);
  font-size: var(--fz-sub);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: var(--br);
  padding: var(--space-md);

  &__title {
    font-size: var(--fz-title);
    font-weight: bold;
  }

  &__play-button {
    border-radius: 50%;
    width: $play-button-size;
    background-color: var(--color-neutral-800);
    height: $play-button-size;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  &__spinner {
    animation: spin 2s ease-in forwards infinite;
  }

  &_active {
    background-color: var(--color-green-dark);

    .music-item__play-button {
      background-color: var(--color-neutral-700);
    }
  }
}

.music-info {
  &__text {
    margin-top: 2px;
  }

  &__link {
    color: var(--color-blue-light-active);

    &:hover {
      color: var(--color-blue-light-hover);
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>