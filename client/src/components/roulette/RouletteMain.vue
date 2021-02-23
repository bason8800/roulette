<template>
  <div class="roulette-main">
    <div class="roulette-main__field">
      <div class="roulette-main__countdown">
        <span>{{ time }}</span>
      </div>

      <canvas
        ref="canvas"
        width="500"
        height="500"
        class="roulette-main__canvas"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, watch } from 'vue';

import { useStore } from '@/store';

import { RouletteWheel } from '@/classes/roulette/RouletteWheel';

export default defineComponent({
  name: 'RouletteMain',
  setup() {
    const {
      state: { roulette },
    } = useStore();

    let rouletteWheel = {} as RouletteWheel;

    const canvas = ref<HTMLCanvasElement>();

    const time = computed(() => roulette.time);

    const stopRotateHandler = (val: string) => {
      console.log(123);
    };

    const firstDraw = () => {
      const context = canvas.value?.getContext('2d');

      if (!context) {
        return;
      }

      rouletteWheel = new RouletteWheel(
        context,
        stopRotateHandler,
        roulette.options,
      );

      rouletteWheel.drawWheel();
    };

    const reDraw = () => {
      rouletteWheel.drawWheel(roulette.startAngle);
    };

    watch(() => roulette.options, firstDraw);
    watch(() => roulette.startAngle, reDraw);

    return {
      canvas,
      time,
    };
  },
});
</script>

<style lang="scss">
.roulette-main {
  width: 100%;

  &__field {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 500px;
    transition: background $transition;
  }

  &__countdown {
    position: absolute;
    top: 250px;
    left: 0;
    width: 100%;
    margin-top: -17px;
    font-size: 30px;
    text-align: center;
  }
}
</style>
