import { ICoordinates, IDrawable, ISize } from './interfaces';
import { Point } from './Point';

// TODO: make different shapes
export class Chaser implements IDrawable {
  constructor(private settings: IDotSettings = Chaser.DEFAULT_SETTINGS) {
    const {
      position,
      speed,
      acceleration,
      size
    } = Object.assign({}, Chaser.DEFAULT_SETTINGS, settings);

    this.maxSpeed = speed;
    this.acceleration = acceleration;
    this.size = size;
    this.currentPosition = new Point(
      position.x - (this.size.width / 2),
      position.y - (this.size.width / 2)
    );
  }

  private lastUpdate: number = Date.now();
  private currentPosition: Point;
  private targetPosition: Point;
  private readonly maxSpeed: number;          // pixels per second
  private currentSpeed: number = 0;           // pixels per second
  private readonly acceleration: number;      // pixels pre second^2
  private size: ISize;

  public setTargetPosition({ x, y }: ICoordinates): void {
    this.targetPosition = new Point(
      x - (this.size.width / 2),
      y - (this.size.height / 2)
    );
  }

  public draw(context: CanvasRenderingContext2D): void {
    const timePassed = (Date.now() - this.lastUpdate) / 1000;

    if (this.targetPosition) {
      this.currentSpeed = this.currentSpeed < this.maxSpeed
        ? this.currentSpeed + this.acceleration * timePassed
        : this.maxSpeed;
      this.currentPosition = this.currentPosition.getNextPosition(this.targetPosition, this.currentSpeed, timePassed);
    }

    if (this.currentPosition.equalsTo(this.targetPosition))  {
      this.targetPosition = null;
      this.currentSpeed = 0;
    }

    context.beginPath();
    context.strokeRect(this.currentPosition.x, this.currentPosition.y, this.size.width, this.size.height);
    this.lastUpdate = Date.now();
  }

  public static get DEFAULT_SETTINGS(): IDotSettings {
    return {
      position: new Point(0, 0),
      speed: 500,
      acceleration: 100,
      size: {
        width: 1,
        height: 1
      }
    };
  }
}

interface IDotSettings {
  position?: ICoordinates;
  speed?: number;
  acceleration?: number;
  size?: {
    width: number;
    height: number;
  };
}
