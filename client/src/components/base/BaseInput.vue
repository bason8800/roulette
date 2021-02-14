<template>
  <div class="base-input">
    <input type="text" :value="modelValue" @input="onInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const onInput = (e: { target: HTMLInputElement }) => {
      ctx.emit('update:modelValue', e.target.value);
    };

    return {
      onInput,
    };
  },
});
</script>

<style lang="scss"></style>
