import { IPosition, IDrawable, ISize, ITrackable } from './interfaces';
import { Point } from './Point';
import { Target } from './Target';

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
    this.position = new Point(
      position.x - (this.size.width / 2),
      position.y - (this.size.width / 2)
    );
  }

  private position: Point;
  private target: Target;
  private readonly maxSpeed: number;          // pixels per second
  private currentSpeed: number = 0;           // pixels per second
  private readonly acceleration: number;      // pixels pre second
  private size: ISize;
  private mode: TargetingModesEnum = TargetingModesEnum.Idle;

  public getCurrentPosition(): Point {
    return this.position.copy();
  }

  public moveTo(target: ITrackable): void {
    this.setTarget(target, TargetingModesEnum.Move);
  }

  public follow(target: ITrackable): void {
    this.setTarget(target, TargetingModesEnum.Follow);
  }

  private stop() {
    this.currentSpeed = 0;
    if (this.mode === TargetingModesEnum.Move) {
      this.clearTarget();
    }
  }

  public draw(context: CanvasRenderingContext2D, timePassed: number): void {
    if (this.target) {
      this.target.update();

      if (this.target.position) {
        this.currentSpeed = this.currentSpeed < this.maxSpeed
          ? this.currentSpeed + this.acceleration * timePassed
          : this.maxSpeed;

        this.position = this.position.getNextPosition(this.target.position, this.currentSpeed, timePassed);

        if (this.position.equalsTo(this.target.position)) {
          this.stop();
        }
      }
    }

    context.beginPath();
    context.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }

  private setTarget(target: ITrackable, mode: TargetingModesEnum = TargetingModesEnum.Idle): void {
    this.target = new Target(target);
    this.mode = mode;
  }

  private clearTarget(): void {
    this.target = null;
    this.mode = TargetingModesEnum.Idle;
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
