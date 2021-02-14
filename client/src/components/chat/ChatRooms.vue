<template>
  <div class="chat-rooms">
    <div v-for="room in rooms" :key="room.id" class="chat-rooms__item">
      {{ room }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useStore } from '@/store';

export default defineComponent({
  name: 'ChatRooms',
  setup() {
    const {
      state: { chat },
    } = useStore();

    const rooms = computed(() => chat.roomList);

    return {
      rooms,
    };
  },
});
</script>

<style lang="scss"></style>
