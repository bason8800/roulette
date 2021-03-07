<template>
  <div class="bet-actions">
    <BaseInput
      class="bet-actions__value"
      :model-value="modelValue"
      @update:modelValue="$emit('update:modelValue', +$event)"
    />

    <div
      v-for="action in actions"
      :key="action.name"
      class="bet-actions__item"
      @click="onActionsHandler(action.value, action.replace)"
    >
      {{ action.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import BaseInput from '@/components/base/BaseInput.vue';

export default defineComponent({
  name: 'BetActions',
  components: {
    BaseInput,
  },
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    const {
      state: { user },
    } = useStore();

    const onActionsHandler = (val: number, replace: boolean) => {
      ctx.emit('update:modelValue', replace ? val : val + props.modelValue);
    };

    const actions = computed(() => [
      { name: '1', value: 1 },
      { name: '10', value: 10 },
      { name: '20', value: 20 },
      { name: '50', value: 50 },
      { name: '100', value: 100 },
      { name: '1/2', value: props.modelValue / 2, replace: true },
      { name: 'x2', value: props.modelValue * 2, replace: true },
    ]);

    return {
      actions,
      onActionsHandler,
    };
  },
});
</script>

<style lang="scss">
.bet-actions {
  display: flex;
  align-items: center;

  &__value {
    width: 100px;
    padding: 10px;
    margin-right: 50px;
    background: $color-dark;
  }

  &__item {
    width: 30px;
    padding: 10px;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
    background: $color-grey;
    border-radius: 4px;
  }
}
</style>
