<template>
  <div class="roulette">
    <div class="roulette__balance">Balance: {{ balance }}</div>

    <div class="roulette__left">
      <ChatRooms class="roulette__chat-rooms" />
      <ChatMain class="roulette__chat" />
    </div>

    <div class="roulette__wrapper">
      <RouletteMain class="roulette__main" />
      <BetsMain class="roulette__bets" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import ChatMain from '@/components/chat/ChatMain.vue';
import ChatRooms from '@/components/chat/ChatRooms.vue';
import RouletteMain from '@/components/roulette/RouletteMain.vue';
import BetsMain from '@/components/bet/BetsMain.vue';

import { useStore } from '@/store';

export default defineComponent({
  name: 'Home',
  components: {
    ChatMain,
    ChatRooms,
    RouletteMain,
    BetsMain,
  },
  setup() {
    const {
      state: { user },
    } = useStore();

    const balance = computed(() => user.balance);

    return {
      balance,
    };
  },
});
</script>

<style lang="scss">
.roulette {
  display: flex;
  height: 100%;

  &__balance {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 25px;
    color: $color-yellow;
  }

  &__left {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 280px;
    padding: 10px;
    background: $color-main-light;
  }

  &__chat {
    height: 85%;
    margin-top: 15px;
    overflow: auto;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__bets {
    margin-top: 50px;
  }

  &__bet-actions {
    box-sizing: border-box;
    width: 100%;
    padding: 0 50px;
    margin-top: 50px;
  }

  &__bets-list {
    margin-top: 50px;
  }
}
</style>
