type RotateHandler = (...args: any) => void;
type WheelItem = {
  value: number;
  color: string;
};

export class RouletteWheel {
  private readonly arc: number;

  private readonly options: Array<WheelItem>;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly stopRotateHandler: RotateHandler;

  private readonly canvasCenter = 250;

  constructor(
    context: CanvasRenderingContext2D,
    stopRotateHandler: RotateHandler,
    options: Array<WheelItem>,
  ) {
    this.ctx = context;
    this.stopRotateHandler = stopRotateHandler;
    this.options = options;
    this.arc = Math.PI / (this.options.length / 2);

    this.drawWheel();
  }

  drawWheel(startAngle = 0) {
    const outsideRadius = 200;
    const textRadius = 160;
    const insideRadius = 125;

    this.ctx.clearRect(0, 0, 500, 500);

    this.ctx.strokeStyle = '#ccc';
    this.ctx.lineWidth = 0;

    this.ctx.font = 'bold 12px Helvetica, Arial';

    for (let i = 0; i < this.options.length; i++) {
      const angle = startAngle + i * this.arc;

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
    this.ctx.fillStyle = this.options[i].color;

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
    this.ctx.fillStyle = 'white';

    this.ctx.translate(
      this.canvasCenter + Math.cos(angle + this.arc / 2) * textRadius,
      this.canvasCenter + Math.sin(angle + this.arc / 2) * textRadius,
    );
    this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);

    const text = this.options[i].value.toString();

    this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
    this.ctx.restore();
  }
}
