class Roulette {
  io = null;
  options = [1, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8];

  nextSpinTime = 0;
  timeBeforeNextSpin = 10000;

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

    this.setDefaultSpin();

    const degrees = (this.startAngle * 180) / Math.PI + 90;
    const arcd = (this.arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);

    setTimeout(() => this.io.emit("GET_WHEEL_DATA", { startAngle: 0 }), 1000);

    return index;
  }

  easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
}

module.exports = Roulette;
