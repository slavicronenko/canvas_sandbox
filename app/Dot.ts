import { ICoordinates, IDrawable, ISize } from './interfaces';
import { getNextPosition } from './util';

export class Dot implements IDrawable {
  constructor(private settings: IDotSettings = Dot.DEFAULT_SETTINGS) {
    const {
      position,
      speed
    } = Object.assign({}, Dot.DEFAULT_SETTINGS, settings);

    this.currentPosition = position;
    this.speed = speed;
  }

  private lastPositionUpdate: number = Date.now();
  private currentPosition: ICoordinates;
  private targetPosition: ICoordinates;
  private readonly speed: number; // pixels per second
  private size: ISize = {
    width: 1,
    height: 1
  };

  public setTargetPosition({ x, y }: ICoordinates): void {
    this.targetPosition = { x, y };
  }

  public draw(context: CanvasRenderingContext2D): void {
    const nextPosition = (this.targetPosition && this.currentPosition !== this.targetPosition)
      ? getNextPosition(this.currentPosition, this.targetPosition, this.speed, this.lastPositionUpdate)
      : this.currentPosition;

    if (nextPosition === this.targetPosition)  {
      this.targetPosition = null;
    }

    context.beginPath();
    context.strokeRect(nextPosition.x, nextPosition.y, this.size.width, this.size.height);
    this.currentPosition = nextPosition;
    this.lastPositionUpdate = Date.now();
  }

  public static get DEFAULT_SETTINGS(): IDotSettings {
    return {
      position: { x: 0, y: 0 },
      speed: 500
    };
  }
}

interface IDotSettings {
  position?: ICoordinates;
  speed?: number;
}
