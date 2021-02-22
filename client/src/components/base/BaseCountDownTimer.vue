<template>
  <div class="base-countdown">{{ time }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'BaseCountDownTimer',
  emits: ['end-time'],
  props: {
    seconds: {
      type: Number,
      default: 0,
    },
    run: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const time = ref('00.00');

    let usedTime = 0;
    let totalTime = 0;
    let startTime = 0;
    let timer = 0;

    const count = () => {
      usedTime = Math.floor((+new Date() - startTime) / 10);

      const fillZero = (num: number) => (num < 10 ? '0' + num : num);
      const tt = totalTime - usedTime;

      if (tt <= 0) {
        time.value = '00.00';
        ctx.emit('end-time');
        clearInterval(timer);

        return;
      }

      const mi = Math.floor(tt / (60 * 100));
      const ss = Math.floor((tt - mi * 60 * 100) / 100);
      const ms = tt - Math.floor(tt / 100) * 100;

      time.value = `${fillZero(ss)}.${fillZero(ms)}`;
    };

    const setDefaultValues = () => {
      if (timer) {
        clearInterval(timer);

        timer = 0;
        usedTime = 0;
        totalTime = props.seconds * 100;
        startTime = +new Date();

        time.value = '00.00';
      }
    };

    const start = () => {
      if (!timer) {
        timer = setInterval(count, 10);
      }
    };

    watch(
      () => props.run,
      () => {
        if (props.run) {
          setDefaultValues();
          start();
        }
      },
      { immediate: true },
    );

    return { time };
  },
});
</script>

<style lang="scss">
.base-countdown {
  //
}
</style>
