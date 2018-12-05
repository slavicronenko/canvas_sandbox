import { IPosition, IDrawable, ISize, ITrackable } from './interfaces';
import { Point } from './Point';

// TODO: different shapes, intercept, collision, bouncing
export class Chaser implements IDrawable, ITrackable {
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

  private currentPosition: Point;
  private target: Point | ITrackable;
  private readonly maxSpeed: number;          // pixels per second
  private currentSpeed: number = 0;           // pixels per second
  private readonly acceleration: number;      // pixels pre second
  private size: ISize;
  private mode: TargetingModesEnum = TargetingModesEnum.Idle;

  public getCurrentPosition(): Point {
    return new Point(this.currentPosition.x, this.currentPosition.y);
  }

  public moveTo(target: Point | ITrackable): void {
    this.setTarget(target, TargetingModesEnum.Move);
  }

  public follow(target: Point | ITrackable): void {
    this.setTarget(target, TargetingModesEnum.Follow);
  }

  private stop() {
    this.currentSpeed = 0;
    if (this.mode === TargetingModesEnum.Move) {
      this.setTarget(null);
    }
  }

  public draw(context: CanvasRenderingContext2D, timePassed: number): void {
    const targetPosition = this.target instanceof Point
      ? this.target
      : this.target && this.target.getCurrentPosition();

    if (targetPosition) {
      this.currentSpeed = this.currentSpeed < this.maxSpeed
        ? this.currentSpeed + this.acceleration * timePassed
        : this.maxSpeed;

      this.currentPosition = this.currentPosition.getNextPosition(targetPosition, this.currentSpeed, timePassed);

      if (this.currentPosition.equalsTo(targetPosition)) {
        this.stop();
      }
    }

    context.beginPath();
    context.strokeRect(this.currentPosition.x, this.currentPosition.y, this.size.width, this.size.height);
  }

  private setTarget(target: Point | ITrackable, mode: TargetingModesEnum = TargetingModesEnum.Idle): void {
    this.target = target;
    this.mode = mode;
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
  position?: IPosition;
  speed?: number;
  acceleration?: number;
  size?: {
    width: number;
    height: number;
  };
}

enum TargetingModesEnum {
  Idle,
  Move,
  Follow
}
