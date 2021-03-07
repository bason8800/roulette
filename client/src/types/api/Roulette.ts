export type WheelItem = {
  value: number;
  color: string;
};

export type RouletteWheelData = {
  startAngle: number;
  previousRolls: Array<WheelItem>;
};

export type Roulette = {
  time: number;
  options: Array<WheelItem>;
} & RouletteWheelData;
