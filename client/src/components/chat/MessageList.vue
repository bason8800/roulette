<template>
  <transition-group name="transition-fade">
    <div v-if="list.length" class="message-list">
      <MessageListItem
        v-for="(item, idx) in list"
        :key="idx"
        :message="item.message"
        :user="getUser(item.userId)"
        class="message-list__item"
      />
    </div>
  </transition-group>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import { ChatMessage } from '@/types/api/Chat';

import { useStore } from '@/store';

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
  setup() {
    const {
      state: { chat },
    } = useStore();

    const usersRoomList = computed(() => chat.room.users);

    const getUser = (userId: number) => {
      return usersRoomList.value.find(user => user.id === userId);
    };

    return {
      usersRoomList,
      getUser,
    };
  },
});
</script>

<style lang="scss">
.message-list {
  &__item {
    margin-bottom: 10px;
  }
}
</style>
