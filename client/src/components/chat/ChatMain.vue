<template>
  <div class="main-chat">
    <MessageList :list="messageList" />

    <BaseInput
      v-model="message"
      component="textarea"
      class="main-chat__add-message"
      @keyup.enter="addMessage"
    />
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
      state: { chat, user },
    } = useStore();

    const message = ref('');

    const messageList = computed(() => chat.room.messagesList);

    const addMessage = (e: InputEvent) => {
      e.stopPropagation();

      chatSocket.addMessage(chat.room.id, {
        message: message.value,
        userId: user.id,
      });

      message.value = '';
    };

    return {
      messageList,
      message,
      addMessage,
    };
  },
});
</script>

<style lang="scss">
.main-chat {
  &__add-message {
    position: fixed;
    bottom: 20px;
    left: 10px;
    width: 280px;
  }
}
</style>
