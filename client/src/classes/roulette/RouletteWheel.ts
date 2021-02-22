type RotateHandler = (...args: any) => void;

export class RouletteWheel {
  private options = [1, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8];

  private readonly spinTimeTotal = 5000;

  private readonly arc = Math.PI / (this.options.length / 2);

  private readonly canvasCenter = 250;

  private startAngle = 0;

  private spinTimeout = 0;

  private spinTime = 0;

  private spinAngleStart = 0;

  private ctx: CanvasRenderingContext2D | null = null;

  private stopRotateHandler: RotateHandler | null = null;

  init(canvas: HTMLCanvasElement | null, stopRotateHandler: RotateHandler) {
    if (!canvas || !canvas.getContext) {
      return;
    }

    this.stopRotateHandler = stopRotateHandler;
    this.ctx = canvas.getContext('2d');

    this.drawRouletteWheel();
  }

  drawRouletteWheel() {
    if (!this.ctx) {
      return;
    }

    const outsideRadius = 200;
    const textRadius = 160;
    const insideRadius = 125;

    this.ctx.clearRect(0, 0, 500, 500);

    this.ctx.strokeStyle = '#ccc';
    this.ctx.lineWidth = 0;

    this.ctx.font = 'bold 12px Helvetica, Arial';

    for (let i = 0; i < this.options.length; i++) {
      const angle = this.startAngle + i * this.arc;

      this.drawArc(i, outsideRadius, insideRadius, angle);
      this.drawText(i, angle, textRadius);
    }

    this.drawArrow(outsideRadius);
  }

  drawArc(
    i: number,
    outsideRadius: number,
    insideRadius: number,
    angle: number,
  ) {
    if (!this.ctx) {
      return;
    }

    this.ctx.fillStyle = this.getColor(i, this.options[i]);

    this.ctx.beginPath();

    this.ctx.arc(
      this.canvasCenter,
      this.canvasCenter,
      outsideRadius,
      angle,
      angle + this.arc,
      false,
    );

    this.ctx.arc(
      this.canvasCenter,
      this.canvasCenter,
      insideRadius,
      angle + this.arc,
      angle,
      true,
    );

    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.save();
  }

  drawArrow(outsideRadius: number) {
    if (!this.ctx) {
      return;
    }

    const arrowLines = [
      [this.canvasCenter + 4, this.canvasCenter - (outsideRadius + 5)],
      [this.canvasCenter + 4, this.canvasCenter - (outsideRadius - 5)],
      [this.canvasCenter + 9, this.canvasCenter - (outsideRadius - 5)],
      [this.canvasCenter, this.canvasCenter - (outsideRadius - 13)],
      [this.canvasCenter - 9, this.canvasCenter - (outsideRadius - 5)],
      [this.canvasCenter - 4, this.canvasCenter - (outsideRadius - 5)],
      [this.canvasCenter - 4, this.canvasCenter - (outsideRadius + 5)],
    ];

    this.ctx.fillStyle = '#ccc';
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvasCenter - outsideRadius);

    arrowLines.forEach(line => {
      this.ctx && this.ctx.lineTo(line[0], line[1]);
    });

    this.ctx.fill();
  }

  drawText(i: number, angle: number, textRadius: number) {
    if (!this.ctx) {
      return;
    }

    this.ctx.fillStyle = 'white';

    this.ctx.translate(
      this.canvasCenter + Math.cos(angle + this.arc / 2) * textRadius,
      this.canvasCenter + Math.sin(angle + this.arc / 2) * textRadius,
    );
    this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);

    const text = this.options[i].toString();

    this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
    this.ctx.restore();
  }

  getColor(i: number, val: number) {
    if (val === 0) {
      return 'green';
    }

    return i % 2 === 0 ? 'red' : 'black';
  }

  spin() {
    this.spinTime = 0;
    this.spinAngleStart = Math.random() * 10 + 10;

    this.rotateWheel();
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

    this.drawRouletteWheel();

    this.spinTimeout = setTimeout(() => this.rotateWheel(), 10);
  }

  stopRotateWheel() {
    if (!this.ctx) {
      return;
    }

    clearTimeout(this.spinTimeout);

    const degrees = (this.startAngle * 180) / Math.PI + 90;
    const arcd = (this.arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);

    this.ctx.save();

    const text = this.options[index].toString();

    if (this.stopRotateHandler) {
      this.stopRotateHandler(text);
    }

    this.ctx.restore();
  }

  easeOut(t: number, b: number, c: number, d: number) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
}
