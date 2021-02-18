<template>
  <div class="roulette">
    <div class="roulette__left">
      <ChatRooms class="roulette__chat-rooms" />

      <ChatMain class="roulette__chat" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ChatMain from '@/components/chat/ChatMain.vue';
import ChatRooms from '@/components/chat/ChatRooms.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ChatMain,
    ChatRooms,
  },
});
</script>

<style lang="scss">
.roulette {
  display: flex;
  height: 100%;

  &__left {
    display: flex;
    flex-direction: column;
    width: 280px;
    padding: 10px;
    background: $color-main-light;
  }

  &__chat {
    height: 85%;
    margin-top: 15px;
    overflow: auto;
  }
}
</style>
