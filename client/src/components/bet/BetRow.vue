<template>
  <div class="bet-row">
    <div class="bet-row__header">
      <div class="bet-row__color" :style="`background: ${bet.color}`"></div>
      PLACE BET {{ bet.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { Bet } from '@/types/api/Bet';

export default defineComponent({
  name: 'BetRow',
  props: {
    bet: {
      type: Object as PropType<Bet>,
      default: () => ({}),
    },
    winId: {
      type: Number,
      default: 0,
    },
  },
  setup() {},
});
</script>

<style lang="scss">
.bet-row {
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    background: $color-grey;
    border-radius: 4px;
  }

  &__color {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 30px;
  }
}
</style>
