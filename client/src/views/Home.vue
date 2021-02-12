<template>
  <div class="roulette">
    <MainChat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainChat from '@/components/chat/MainChat.vue';

export default defineComponent({
  name: 'Home',
  components: {
    MainChat,
  },
});
</script>
