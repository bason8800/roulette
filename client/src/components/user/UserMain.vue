<template>
  <div class="user-main">
    <img class="user-main__avatar" :src="avatar" />

    <div class="user-main__content">
      <span class="user-main__level">{{ user.level }}</span>

      <span class="user-main__name" :class="{ 'is-bold': isBoldName }">
        {{ user.name }}
      </span>

      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import { ChatUser } from '@/types/api/Chat';

import { AVATAR_BASE_URL } from '@/constants/helpers';

export default defineComponent({
  name: 'UserMain',
  props: {
    user: {
      type: Object as PropType<ChatUser>,
      required: true,
    },
    isBoldName: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const avatar = computed(() => `${AVATAR_BASE_URL}/${props.user.id}.svg`);

    return { avatar };
  },
});
</script>

<style lang="scss">
.user-main {
  display: flex;
  align-items: flex-start;

  &__avatar {
    position: relative;
    top: -5px;
    width: 25px;
    margin-right: 10px;
  }

  &__level {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 41px;
    height: 18px;
    margin-right: 5px;
    font-weight: bold;
    line-height: 1;
    color: $color-main;
    background: $color-user-lvl-1;
    border-radius: 4px;
  }

  &__name {
    margin-right: 10px;

    &.is-bold {
      font-weight: bold;
    }
  }
}
</style>
