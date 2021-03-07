<template>
  <div class="bets-main">
    <BetActions v-model="userBet" class="bets-main__actions" />
    <BetsList class="bets-main__list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import BetActions from './BetActions.vue';
import BetsList from './BetsList.vue';

export default defineComponent({
  name: 'BetsMain',
  components: {
    BetActions,
    BetsList,
  },
  setup() {
    const userBet = ref(0);

    return {
      userBet,
    };
  },
});
</script>

<style lang="scss">
.bets-main {
  box-sizing: border-box;
  width: 100%;
  padding: 0 50px;

  &__actions {
    margin-bottom: 50px;
  }
}
</style>
