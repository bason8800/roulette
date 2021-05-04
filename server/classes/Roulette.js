const bets = require("../mock/bets");
const events = require("../events");

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

const WHEEL_TO_DEFAULT_TIMEOUT = 3000;
const WHEEL_TO_DEFAULT_ITERATION_COUNT = 50;

class Roulette {
  io = null;
  user = null;

  options = getOptions();
  previousRolls = [];

  nextSpinTime = 0;
  timeBeforeNextSpin = 1000;

  spinTime = 0;
  spinAngleStart = 0;
  spinTimeTotal = 0;
  spinTimeout = null;

  arc = Math.PI / (this.options.length / 2);
  startAngle = 0;

  countDownTimeout = null;

  constructor({ io, user }) {
    this.io = io;
    this.user = user;

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

      this.io.emit(events.GET_ROULETTE_TIME, "0.00");

      return;
    }

    const time = (this.nextSpinTime - +new Date()) / 1000;

    this.io.emit(events.GET_ROULETTE_TIME, time.toFixed(2));

    this.countDownTimeout = setTimeout(() => this.checkTime(), 10);
  }

  rotateWheel() {
    this.spinTime += 30;

    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }

    const spinAngle =
      this.spinAngleStart -
      this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);

    this.startAngle += (spinAngle * Math.PI) / 180;
    this.spinTimeout = setTimeout(() => this.rotateWheel(), 10);

    this.io.emit(events.GET_WHEEL_DATA, { startAngle: this.startAngle });
  }

  stopRotateWheel() {
    clearTimeout(this.spinTimeout);

    const roll = this.getWinRoll();
    const bet = bets.find(item => item.color === roll.color);

    this.updatePreviousRolls(roll);

    this.io.emit(events.GET_WHEEL_DATA, { previousRolls: this.previousRolls });
    this.io.emit(events.GET_WIN_BET, bet.id);

    this.user.updateUsersListBalance(
      bet.items.map(item => ({
        userId: item.userId,
        value: item.value * bet.count
      }))
    );

    setTimeout(() => {
      const angleToBack = this.startAngle / WHEEL_TO_DEFAULT_ITERATION_COUNT;

      this.returnWheelToDefaultState(angleToBack);

      this.io.emit(events.GET_WIN_BET, 0);
    }, WHEEL_TO_DEFAULT_TIMEOUT);
  }

  getWinRoll() {
    const degrees = (this.startAngle * 180) / Math.PI + 90;
    const arcd = (this.arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);

    return { id: Math.random(), ...this.options[index] };
  }

  updatePreviousRolls(roll) {
    this.previousRolls.push(roll);

    if (this.previousRolls.length > 10) {
      this.previousRolls = this.previousRolls.slice(1);
    }
  }

  returnWheelToDefaultState(angleToBack) {
    if (this.startAngle <= 0) {
      setTimeout(() => {
        this.setDefaultSpin();
        this.clearBets();
        this.updateNextSpinTime();
        this.checkTime();
      }, 2000);

      return;
    }

    this.startAngle -= angleToBack;

    if (this.startAngle <= angleToBack) {
      this.startAngle = 0;
    }

    this.io.emit(events.GET_WHEEL_DATA, { startAngle: this.startAngle });

    setTimeout(() => this.returnWheelToDefaultState(angleToBack), 10);
  }

  clearBets() {
    bets.forEach(bet => {
      bet.items = [];
    });

    this.io.emit(events.GET_BETS_LIST, bets);
  }

  easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
}

module.exports = Roulette;
