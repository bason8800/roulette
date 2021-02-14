<template>
  <div class="message-list">
    <transition-group name="transition-fade">
      <MessageListItem
        v-for="message in list"
        :key="message.userId"
        :message="message"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ChatMessage } from '@/types/api/Chat';

import MessageListItem from './MessageListItem.vue';

export default defineComponent({
  name: 'ChatList',
  props: {
    list: {
      type: Array as PropType<Array<ChatMessage>>,
      default: () => [],
    },
  },
  components: {
    MessageListItem,
  },
});
</script>

<style scoped></style>
