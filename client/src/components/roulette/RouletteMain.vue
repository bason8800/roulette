<template>
  <div class="roulette-main">
    <div class="roulette-main__field" :style="style"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'RouletteMain',
  setup() {
    const style = reactive({
      backgroundPosition: '0px',
    });

    const coinWidth = 100;
    const coinCounts = 16;

    setInterval(() => {
      // p += 300;
      // style.backgroundPosition = `${p}px`;
    }, 100);

    return {
      style,
    };
  },
});
</script>

<style lang="scss">
.roulette-main {
  width: 100%;

  &__field {
    width: 100%;
    height: 100px;
    margin-top: 400px;
    background: url('~@/assets/img/coins-bonus.png') repeat-x center;
    background-size: auto 100px;
    transition: background $transition;
  }
}
</style>
