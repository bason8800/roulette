export type RouletteWheelData = {
  arc: number;
  startAngle: number;
};

export type Roulette = {
  time: number;
  options: Array<number>;
} & RouletteWheelData;
