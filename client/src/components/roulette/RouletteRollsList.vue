<template>
  <div class="roulette-rolls-list">
    <div
      v-for="item in list"
      :key="item.value + Math.random()"
      class="roulette-rolls-list__item"
      :style="{ background: item.color }"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { WheelItem } from '@/types/api/Roulette';

export default defineComponent({
  name: 'RouletteRollsList',
  props: {
    list: {
      type: Array as PropType<Array<WheelItem>>,
      default: () => [],
    },
  },
});
</script>

<style lang="scss">
.roulette-rolls-list {
  display: flex;
  justify-content: center;

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 0 5px;
    border-radius: 30px;

    &.is-black {
      background: black;
    }

    &.is-red {
      background: red;
    }

    &.is-green {
      background: green;
    }
  }
}
</style>
