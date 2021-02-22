<template>
  <div class="roulette-main">
    <div class="roulette-main__field">
      <BaseCountDownTimer
        :seconds="40"
        :run="runTimer"
        class="roulette-main__countdown"
        @end-time="onEndTime"
      />

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
import { defineComponent, onMounted, ref, nextTick } from 'vue';

import { RouletteWheel } from '@/classes/roulette/RouletteWheel';

import BaseCountDownTimer from '@/components/base/BaseCountDownTimer.vue';

export default defineComponent({
  name: 'RouletteMain',
  components: {
    BaseCountDownTimer,
  },
  setup(props, ctx) {
    const rouletteWheel = new RouletteWheel();
    const canvas = ref(null);
    const runTimer = ref(true);

    const stopRotateHandler = (val: string) => {
      runTimer.value = false;

      nextTick(() => {
        runTimer.value = true;
      });
    };

    const onEndTime = () => rouletteWheel.spin();

    onMounted(() => {
      rouletteWheel.init(canvas.value, stopRotateHandler);
      rouletteWheel.drawRouletteWheel();
    });

    return {
      canvas,
      runTimer,
      onEndTime,
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
    left: 50%;
    margin-top: -17px;
    margin-left: -35px;
    font-size: 30px;
  }
}
</style>
