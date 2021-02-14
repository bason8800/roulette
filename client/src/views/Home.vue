<template>
  <div class="roulette">
    <div class="roulette__chat">
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

  &__chat {
    width: 280px;
    background: $color-main-light;
  }
}
</style>
