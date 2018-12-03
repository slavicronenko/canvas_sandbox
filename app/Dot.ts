import { IDrawable, ISize } from './interfaces';
import { Point } from './Point';

export class Dot implements IDrawable { // TODO: pick proper name
  constructor(private settings: IDotSettings = Dot.DEFAULT_SETTINGS) {
    const {
      position,
      speed,
      acceleration
    } = Object.assign({}, Dot.DEFAULT_SETTINGS, settings);

    this.currentPosition = position;
    this.maxSpeed = speed;
    this.acceleration = acceleration;
  }

  private lastDrawTime: number = Date.now();
  private currentPosition: Point;
  private targetPosition: Point;
  private readonly maxSpeed: number;          // pixels per second
  private currentSpeed: number = 0;           // pixels per second
  private readonly acceleration: number;      // pixels pre second^2
  private size: ISize = {
    width: 1,
    height: 1
  };

  public setTargetPosition(point: Point): void {
    this.targetPosition = point.copy();
  }

  public draw(context: CanvasRenderingContext2D): void { // TODO: optimize
    if (this.targetPosition) {
      this.updateSpeed();
    }

    this.updatePositions();
    context.beginPath();
    context.strokeRect(this.currentPosition.x, this.currentPosition.y, this.size.width, this.size.height);
    this.lastDrawTime = Date.now();
  }

  private updateSpeed() {
    const timePassed = (Date.now() - this.lastDrawTime) / 1000;

    this.currentSpeed = this.currentSpeed < this.maxSpeed
      ? this.currentSpeed + this.acceleration * timePassed
      : this.maxSpeed;
  }

  private updatePositions() {
    this.currentPosition = (this.targetPosition && this.currentPosition !== this.targetPosition)
      ? Point.calculateNextPosition(this.currentPosition, this.targetPosition, this.currentSpeed, this.lastDrawTime)
      : this.currentPosition;

    if (this.currentPosition.equalsTo(this.targetPosition))  {
      this.targetPosition = null;
      this.currentSpeed = 0;
    }
  }

  public static get DEFAULT_SETTINGS(): IDotSettings {
    return {
      position: new Point(0, 0),
      speed: 500,
      acceleration: 100
    };
  }
}

interface IDotSettings {
  position?: Point;
  speed?: number;
  acceleration?: number;
}
