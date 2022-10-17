<template>
  <div class="pager">
    <nav class="pager__navigation pager-navigation">
      <ul class="pager-navigation__list">
        <li
          v-for="(route, id) in routes"
          :key="id"
          class="pager-navigation__link"
        >
          <router-link
            :name="route.name"
            :to="route.path"
          >
            <ButtonUI
              :is-active="currentRoute === route.name"
              :text="capitalize(route.name as string)"
            />
          </router-link>
        </li>
      </ul>
    </nav>
    <PagerFooter class="pager__footer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, capitalize } from 'vue';
import ButtonUI from './design/ButtonUI.vue';
import PagerFooter from './PagerFooter.vue';

export default defineComponent({
  name: "PagerBase",
  components: { ButtonUI, PagerFooter },
  computed: {
    routes() {
      return this.$router.getRoutes();
    },
    currentRoute() {
      return this.$route.name;
    }
  },
  methods: {
    capitalize
  },
});
</script>

<style scoped lang="scss">
.pager {
  @include popupUI;

  &__footer {
    margin-top: var(--space-md);
  }
}

.pager-navigation {
  &__list {
    display: flex;
    align-items: center;
  }

  &__link + &__link {
    margin-left: var(--space-md);
  }
}
</style>