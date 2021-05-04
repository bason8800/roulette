<template>
  <div class="roulette-rolls-list">
    <transition-group appear name="rolls-list-translate-fade">
      <div
        class="roulette-rolls-list__item"
        :key="item.id"
        v-for="item in list"
      >
        <span
          class="roulette-rolls-list__value"
          :style="{ background: item.color }"
        >
          {{ item.value }}
        </span>
      </div>
    </transition-group>
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
$size: 30px;

.roulette-rolls-list {
  display: flex;
  justify-content: center;
  height: $size;

  &__item {
    position: relative;
    width: $size + 10px;
    height: $size;
  }

  &__value {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $size;
    height: $size;
    border-radius: 100%;

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

.rolls-list-translate-fade {
  &-enter-active,
  &-leave-active {
    transition: all $transition-slow;
  }

  &-enter-from,
  &-leave-to {
    width: 0;
    padding: 0;
    opacity: 0;
    transform: translateX(100%);
  }

  &-leave-to {
    transform: translateX(-$size + 10px);
  }
}
</style>
