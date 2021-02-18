<template>
  <div class="chat-rooms">
    <button
      v-if="selectedRoom"
      class="chat-rooms__selected"
      @click="showList = !showList"
    >
      <span class="chat-rooms__selected-name">
        {{ selectedRoom.name }}
      </span>

      <span v-if="selectedRoom.users" class="chat-rooms__selected-online">
        {{ selectedRoom.users.length }} / {{ usersOnline }}
      </span>
    </button>

    <transition name="transition-fade">
      <div v-if="showList" class="chat-rooms__list">
        <button
          v-for="room in rooms"
          :key="room.id"
          class="chat-rooms__item"
          :class="{ 'is-selected': room.id === selectedRoom.id }"
          @click="onChangeRoom(room.id)"
        >
          <BaseSVGIcon class="chat-rooms__icon" :icon-name="room.icon" />
          {{ room.name }}
          ({{ room.users.length }})
        </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import { useStore } from '@/store';
import { chatSocket } from '@/socket';

import BaseSVGIcon from '@/components/base/BaseSVGIcon.vue';

export default defineComponent({
  name: 'ChatRooms',
  components: {
    BaseSVGIcon,
  },
  setup() {
    const {
      state: { chat, app },
    } = useStore();

    const showList = ref(false);

    const rooms = computed(() => chat.roomList);
    const selectedRoom = computed(() => chat.room);
    const usersOnline = computed(() => app.usersOnline);

    const onChangeRoom = (id: number) => {
      if (id !== selectedRoom.value.id) {
        chatSocket.changeRoom(id);
        showList.value = false;
      }
    };

    return {
      showList,
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
  position: relative;
  z-index: 2;

  &__selected {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    color: $color-grey-2;
    cursor: pointer;
    background: $color-grey-3;
    border: none;
    border-radius: 3px;
    outline: none;
    box-shadow: inset 0 -2px 0 0 $color-main;

    &-name {
      font-weight: bold;
    }

    &-online {
      margin-left: auto;
    }
  }

  &__list {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    background: $color-grey-3;
    border: 1px solid $color-grey;
    border-radius: 4px;
  }

  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 38px;
    font-weight: bold;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: 4px;
    outline: none;
    transition: background $transition;

    &:hover:not(.is-selected) {
      background: $color-grey;
    }

    &.is-selected {
      color: $color-yellow;
    }
  }

  &__icon {
    margin-right: 5px;
  }
}
</style>
