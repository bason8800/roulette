<template>
  <div class="main-chat">
    <MessageList :list="messageList" />
    <button class="main-chat__add" @click="addMessage">
      Add message
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import { chatSocket } from '@/socket';

import MessageList from '@/components/chat/MessageList.vue';

export default defineComponent({
  name: 'MainChat',
  components: {
    MessageList,
  },
  setup() {
    const {
      state: { chat },
    } = useStore();

    const messageList = computed(() => chat.messageList);

    const addMessage = () => {
      chatSocket.addMessage({
        message: 'new message',
        userId: Math.random(),
      });
    };

    return {
      messageList,
      addMessage,
    };
  },
});
</script>

<style scoped></style>
