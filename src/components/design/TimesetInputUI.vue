<template>
  <input
    :value="value"
    type="number"
    class="timeset-input"
    @keydown="onInput"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Minimal and maximum value of input
const MIN = 1;
const MAX = 99;

export default defineComponent({
  name: 'TimesetInputUI',
  props: {
    value: {
      required: true,
      type: Number 
    }
  },
  emits: ['write'],
  methods: {

    /**
     * Listen to input of TimetSet
     * @param e Input event
     */
    onInput(e: KeyboardEvent) {
      const isUtility = e.key === 'Backspace' ||
        e.key.match(/arrow/uig) !== null ||
        e.key === 'Tab' || e.key === 'Enter';

      const inputValue = (e.target as HTMLInputElement).value;
      const isArrowUp = e.key.match(/arrowup/uig) !== null;
      const isArrowDown = e.key.match(/arrowdown/uig) !== null;

      if (isArrowUp && +inputValue + 1 > MAX ||
        isArrowDown && +inputValue - 1 < MIN) {
        e.preventDefault();
        return;
      }

      if (inputValue.length >= 2 && !isUtility) {
        e.preventDefault();
      }

      if (inputValue.length === 0) {
        this.$emit('write', 1);
        return;
      }

      this.$emit('write', +inputValue);
    }
  },
});
</script>

<style scoped lang="scss">
.timeset-input {

  // Remove arrows
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }

  display: inline-block;
  margin: 0 var(--space-xs);
  padding: 2px var(--space-sm);
  width: 43px;

  outline: none;
  border: none;
  border-radius: var(--br-alt);

  background-color: var(--color-neutral-30);
  color: var(--color-neutral-70);

  text-align: center;
  font-size: var(--fz-text);
}
</style>