<template>
  <div class="message-list">
    <ChatMessage
      v-for="message in list"
      :key="message.userId"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import ChatMessage from './MessageListItem.vue';

export default defineComponent({
  name: 'ChatList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ChatMessage,
  },
});
</script>

<style scoped></style>
