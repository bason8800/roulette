<template>
  <div class="message-list-item">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatMessage',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped></style>
