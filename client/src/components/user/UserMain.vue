<template>
  <div class="user-main">
    {{ user.level }}
    {{ user.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ChatUser } from '@/types/api/Chat';

export default defineComponent({
  name: 'UserMain',
  props: {
    user: {
      type: Object as PropType<ChatUser>,
      required: true,
    },
  },
});
</script>

<style lang="scss"></style>
