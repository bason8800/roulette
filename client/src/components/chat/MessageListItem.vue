<template>
  <div class="message-list-item">
    <UserMain class="message-list-item__user" :user="user" />
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UserMain from '@/components/user/UserMain.vue';

export default defineComponent({
  name: 'MessageListItem',
  components: {
    UserMain,
  },
  props: {
    message: {
      type: String,
      default: '',
    },
    user: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.message-list-item {
  display: flex;

  &__user {
    margin-right: 10px;
  }
}
</style>
