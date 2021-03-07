const bets = require("../mock/bets");

const getColor = (i, val) => {
  if (val === 0) {
    return "green";
  }

  return i % 2 === 0 ? "red" : "black";
};

const getOptions = () => {
  return [1, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8].map((value, i) => ({
    value,
    color: getColor(i, value)
  }));
};

class Roulette {
  io = null;
  options = getOptions();
  previousRolls = [];

  nextSpinTime = 0;
  timeBeforeNextSpin = 30000;

  spinTime = 0;
  spinAngleStart = 0;
  spinTimeTotal = 0;
  spinTimeout = null;

  arc = Math.PI / (this.options.length / 2);
  startAngle = 0;

  countDownTimeout = null;

  constructor(io) {
    this.io = io;

    this.setDefaultSpin();
  }

  setDefaultSpin() {
    this.spinTime = 0;
    this.startAngle = 0;
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
  }

  init() {
    this.updateNextSpinTime();
    this.checkTime();
  }

  updateNextSpinTime() {
    this.nextSpinTime = +new Date() + this.timeBeforeNextSpin;
  }

  checkTime() {
    const currDate = +new Date();

    if (currDate > this.nextSpinTime) {
      clearTimeout(this.countDownTimeout);

      this.rotateWheel();
      this.io.emit("GET_ROULETTE_TIME", "0.00");
      return;
    }

    const time = (this.nextSpinTime - +new Date()) / 1000;

    this.io.emit("GET_ROULETTE_TIME", time.toFixed(2));

    this.countDownTimeout = setTimeout(() => this.checkTime(), 10);
  }

  rotateWheel() {
    this.spinTime += 30;

    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      this.updateNextSpinTime();
      this.checkTime();
      return;
    }

    const spinAngle =
      this.spinAngleStart -
      this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);

    this.startAngle += (spinAngle * Math.PI) / 180;
    this.spinTimeout = setTimeout(() => this.rotateWheel(), 10);

    this.io.emit("GET_WHEEL_DATA", { startAngle: this.startAngle });
  }

  stopRotateWheel() {
    clearTimeout(this.spinTimeout);

    const roll = this.getWinRoll();
    const bet = bets.find(item => item.color === roll.color);

    this.setDefaultSpin();
    this.updatePreviousRolls(roll);

    this.io.emit("GET_WHEEL_DATA", { previousRolls: this.previousRolls });
    this.io.emit("GET_WIN_BET", bet.id);

    setTimeout(() => {
      this.io.emit("GET_WHEEL_DATA", {
        startAngle: 0
      });
      this.io.emit("GET_WIN_BET");
    }, 1000);
  }

  getWinRoll() {
    const degrees = (this.startAngle * 180) / Math.PI + 90;
    const arcd = (this.arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    console.log(index);

    return this.options[index];
  }

  updatePreviousRolls(roll) {
    this.previousRolls.push(roll);

    if (this.previousRolls.length > 10) {
      this.previousRolls = this.previousRolls.slice(1);
    }
  }

  easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
}

module.exports = Roulette;
