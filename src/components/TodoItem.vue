<template>
  <div
    class="todo-manager-item"
    @dblclick="onTextDoubleClick"
  >
    <div class="todo-manager-item__wrapper">
      <div
        class="todo-manager-item__check"
        @click="$emit('check')"
      >
        <PhosphorIcon
          v-show="$props.itemInfo.isDone"
          :size="14"
          icon-style="bold"
          icon-name="check"
        />
      </div>
      <textarea
        v-show="isEditing"
        ref="inputEditTextRef"
        v-model="editedText"
        spellcheck="false"
        class="todo-manager-item__input"
        @focusout="onInputFocusedOut"
      />
      <div
        v-show="!isEditing"
        class="todo-manager-item__text"
      >
        {{ itemInfo.text }}
      </div>
    </div>
    <div
      class="todo-manager-item__trash"
      @click="$emit('remove')"
    >
      <PhosphorIcon
        icon-style="bold"
        icon-name="trash"
        :size="20"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, PropType } from 'vue';
import { TodoItem } from '../types/todo.types';
import PhosphorIcon from './design/PhosphorIcon.vue';

export default defineComponent({
  name: "TodoItem",
  components: { PhosphorIcon },
  props: {
    itemInfo: {
      type: Object as PropType<TodoItem>,
      required: true
    }
  },
  emits: [
    'change',
    'check',
    'remove',
    'activateEdit'
  ],
  data() {
    return {
      isEditing: false,
      editedText: this.$props.itemInfo.text
    };
  },
  methods: {
    
    /**
     * On doubleclick on text we have to change our view to edit
     */
    onTextDoubleClick(): void {
      this.isEditing = true;
      this.$emit('activateEdit');

      nextTick(() => {
        if (this.$refs.inputEditTextRef) {
          (this.$refs.inputEditTextRef as HTMLInputElement).focus();
        }
      });
    },

    /**
     * When we stop editing - we must save new data
     */
    onInputFocusedOut(): void {
      this.isEditing = false;
      this.$emit('change', this.$props.itemInfo.id, this.editedText);
    }
  },
});
</script>

<style scoped lang="scss">
.todo-manager-item {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-red-normal);
  color: var(--color-neutral-10);
  border-radius: var(--br-alt);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__check {
    max-width: 16px;
    width: 100%;
    height: 16px;
    margin-right: var(--space-sm);
    background-color: var(--color-red-light);
    border-radius: var(--br-alt);
    color: var(--color-neutral-500);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__text {
    user-select: none;
    white-space: pre-wrap;
    font-weight: 300;
  }

  &__input {
    font-weight: 300;
    background-color: transparent;
    color: inherit;
    outline: none;
    border: none;
    width: 100%;
    resize: none;
    padding: 0;
  }

  &__trash {
    margin-left: var(--space-sm);
    color: var(--color-red-light-active);

    &:hover {
      color: var(--color-red-light);
    }
  }
}
</style>