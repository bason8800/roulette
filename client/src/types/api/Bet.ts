type BetItem = {
  userId: number;
  value: number;
};

export type Bet = {
  id: number;
  count: number;
  color: string;
  items: Array<BetItem>;
};

export type BetsList = Array<Bet>;
