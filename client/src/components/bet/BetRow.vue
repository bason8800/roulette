<template>
  <div class="bet-row">
    <div class="bet-row__header" @click="onAddBet">
      <div class="bet-row__color" :style="`background: ${bet.color}`"></div>
      PLACE BET
      <div class="bet-row__win">win {{ bet.count }}x</div>
    </div>

    <div class="bet-row__total">
      <div class="bet-row__total-count">{{ bet.items.length }} Bets Total</div>
      <div class="bet-row__total-value" :class="{ 'is-active': isWin }">
        {{ isWin ? '+' : '' }}
        {{ totalAmount }}
      </div>
    </div>

    <template v-if="bet.items.length">
      <div class="bet-row__items">
        <transition-group
          name="bet-row-fade-height"
          :appear="sortedBetItems.length <= 1 && isMounted"
        >
          <div
            v-for="item in sortedBetItems"
            :key="item.userId"
            class="bet-row__item"
          >
            <UserMain :user="getUser(item.userId)" />

            <div class="bet-row__item-value" :class="{ 'is-active': isWin }">
              {{ isWin ? '+' : '' }}
              {{ isWin ? item.value * bet.count : item.value }}
            </div>
          </div>
        </transition-group>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, PropType } from 'vue';

import { Bet } from '@/types/api/Bet';

import { betSocket } from '@/socket';
import { useStore } from '@/store';

import UserMain from '@/components/user/UserMain.vue';

export default defineComponent({
  name: 'BetRow',
  components: {
    UserMain,
  },
  props: {
    bet: {
      type: Object as PropType<Bet>,
      default: () => ({}),
    },
    winId: {
      type: Number,
      default: 0,
    },
    userBet: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const {
      state: { user, app },
    } = useStore();

    const onAddBet = () => {
      if (!props.userBet) {
        return;
      }

      betSocket.add({
        userId: user.id,
        id: props.bet.id,
        value: +props.userBet,
      });
    };

    const isMounted = ref(false);

    const isWin = computed(() => props.winId === props.bet.id);

    const totalAmount = computed(() => {
      const res = props.bet.items.reduce((acc, item) => item.value + acc, 0);

      if (isWin.value) {
        return res * props.bet.count;
      }

      return res;
    });

    const sortedBetItems = computed(() =>
      [...props.bet.items].sort((a, b) => (a.value < b.value ? 1 : -1)),
    );

    const getUser = (userId: number) =>
      app.users.find(user => user.id === userId);

    onMounted(() => {
      isMounted.value = true;
    });

    return {
      onAddBet,
      getUser,
      totalAmount,
      sortedBetItems,
      isWin,
      isMounted,
    };
  },
});
</script>

<style lang="scss">
@mixin isActive {
  &.is-active {
    color: $color-yellow;
  }
}

.bet-row {
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
    background: $color-grey;
    border-radius: 4px;
  }

  &__color {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 30px;
  }

  &__win {
    margin-left: auto;
  }

  &__total {
    display: flex;
    padding: 10px;
    border: 2px solid $color-dark;
    border-radius: 5px;

    &-value {
      @include isActive;

      margin-left: auto;
    }
  }

  &__items {
    padding: 10px;
    border: 2px solid $color-dark;
  }

  &__item {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    &:last-child {
      padding-bottom: 0;
    }

    &-value {
      @include isActive;

      margin-left: auto;
    }
  }
}

.bet-row-fade-height {
  &-enter-active {
    transition: all $transition;
  }

  &-enter-from {
    height: 0;
    padding: 0;
    opacity: 0;
  }

  &-enter-to {
    height: 25px;
    opacity: 1;
  }
}
</style>
