<template>
  <div class="bets-list">
    <BetRow
      v-for="bet in list"
      :key="bet.id"
      :bet="bet"
      :win-id="winId"
      :user-bet="userBet"
      class="bets-list__row"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import BetRow from '@/components/bet/BetRow.vue';

export default defineComponent({
  name: 'BetsList',
  props: {
    userBet: {
      type: Number,
      default: 0,
    },
  },
  components: {
    BetRow,
  },
  setup() {
    const {
      state: { bet },
    } = useStore();

    const list = computed(() => bet.list);
    const winId = computed(() => bet.winId);

    return {
      list,
      winId,
    };
  },
});
</script>

<style lang="scss">
.bets-list {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;

  &__row {
    width: 30%;
  }
}
</style>
