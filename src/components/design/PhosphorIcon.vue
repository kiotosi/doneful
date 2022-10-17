<template>
  <i
    :style="'font-size: ' + size + 'px'"
    :class="iconClass"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

// Icon style type
type IconStyle = 'thin' | 'light' | '' | 'bold' | 'fill';

export default defineComponent({
  props: {
    iconName: {
      required: true,
      type: String,
      validator: (v: string) => {
        return v.length > 0;
      }
    },
    size: {
      type: Number,
      default: 16
    },
    iconStyle: {
      required: false,
      default: '',
      type: String as PropType<IconStyle>,
    }
  },
  computed: {
    iconClass() {
      let iconClass = 'ph-' + this.iconName;
      
      if (this.iconStyle) {
        iconClass += '-' + this.iconStyle;
      }

      return iconClass;
    }
  }
});
</script>

<style scoped lang="scss"></style>