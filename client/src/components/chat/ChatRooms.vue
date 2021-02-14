<template>
  <div class="chat-rooms">
    <div v-if="selectedRoom" class="chat-rooms__selected">
      {{ selectedRoom.name }}
      <div class="chat-rooms__selected-online">
        {{ selectedRoom.usersCount }} / {{ usersOnline }}
      </div>
    </div>

    <div
      v-for="room in rooms"
      :key="room.id"
      class="chat-rooms__item"
      @click="onChangeRoom(room.id)"
    >
      {{ room.icon }}
      {{ room.name }}
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
      state: { chat, app },
    } = useStore();

    const rooms = computed(() => chat.roomList);
    const selectedRoom = computed(() => chat.room);
    const usersOnline = computed(() => app.usersOnline);

    const onChangeRoom = (id: number) => {
      console.log(id);
    };

    return {
      rooms,
      selectedRoom,
      usersOnline,
      onChangeRoom,
    };
  },
});
</script>

<style lang="scss">
.chat-rooms {
  padding: 10px 0;

  &__selected {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    color: $color-grey-2;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: inset 0 -2px 0 0 $color-main;

    &-online {
      margin-left: auto;
    }
  }

  &__item {
    cursor: pointer;
  }
}
</style>
