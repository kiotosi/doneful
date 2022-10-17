<template>
  <footer class="pager-footer">
    <p class="pager-footer__text">
      Doneful is open source tool for managing your time.
    </p>
    <p class="pager-footer__text">
      Coded with love by <a
        class="pager-footer__link pager-footer__link_blue"
        href="https://github.com/crackidocky"
      >crackidocky</a>.
    </p>
    <p class="pager-footer__text">
      All music from <a
        class="pager-footer__link pager-footer__link_green"
        href="https://pixabay.com/ru/music/search/lofi/?manual_search=1"
      >pixabay</a>. You can click on music name for redirecting.
    </p>
    <p class="pager-footer__text">
      Have a good time! 💖
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PagerFooter'
});
</script>

<style scoped lang="scss">
.pager-footer {
  width: 100%;
  background-color: var(--color-neutral-800);
  font-size: var(--fz-footer);
  padding: var(--space-sm) var(--space-xl);
  border-radius: var(--br);

  &__text {
    color: var(--color-neutral-70);
  }

  &__link {
    &_green {
      color: var(--color-green-normal);
      &:hover {
        color: var(--color-green-normal-hover);
      }
    }
    &_blue {
      color: var(--color-blue-normal);
      &:hover {
        color: var(--color-blue-normal-hover);
      }
    }
  }
}
</style>