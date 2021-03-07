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

    <RouletteRollsList class="roulette-main__list" :list="rollsList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

import { useStore } from '@/store';
import { RouletteWheel } from '@/classes/roulette/RouletteWheel';

import RouletteRollsList from '@/components/roulette/RouletteRollsList.vue';

export default defineComponent({
  name: 'RouletteMain',
  components: {
    RouletteRollsList,
  },
  setup() {
    const {
      state: { roulette },
    } = useStore();

    let rouletteWheel = {} as RouletteWheel;

    const canvas = ref<HTMLCanvasElement>();

    const time = computed(() => roulette.time);
    const rollsList = computed(() => roulette.previousRolls);

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
      rollsList,
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
