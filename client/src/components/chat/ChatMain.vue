<template>
  <div class="main-chat">
    <MessageList :list="messageList" />

    <BaseInput v-model="message" />

    <button class="main-chat__add" @click="addMessage">
      Add message
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import { useStore } from '@/store';
import { chatSocket } from '@/socket';

import BaseInput from '@/components/base/BaseInput.vue';

import MessageList from '@/components/chat/MessageList.vue';

export default defineComponent({
  name: 'ChatMain',
  components: {
    BaseInput,
    MessageList,
  },
  setup() {
    const {
      state: { chat },
    } = useStore();

    const messageList = computed(() => chat.messageList);
    const message = ref('');

    const addMessage = () => {
      chatSocket.addMessage({
        message: message.value,
        userId: Math.random(),
      });
    };

    return {
      messageList,
      message,
      addMessage,
    };
  },
});
</script>

<style lang="scss"></style>
