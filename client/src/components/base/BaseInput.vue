<template>
  <div class="base-input">
    <component
      v-bind="$attrs"
      class="base-input__inner"
      :is="component"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    component: {
      type: String,
      default: 'input',
      validator: (val: string) => ['input', 'textarea'].includes(val),
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

<style lang="scss">
.base-input {
  &__inner {
    position: relative;
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding: 12px 36px 12px 15px;
    color: $color-grey-1;
    resize: none;
    background-color: $color-dark;
    border: 1px solid $color-grey;
    border-radius: 4px;
    outline: none;
    transition: border $transition;

    &:focus {
      border-color: $color-yellow;
    }
  }
}
</style>
