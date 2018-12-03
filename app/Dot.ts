import { ICoordinates, IDrawable, ISize } from './interfaces';
import { getNextPosition } from './util';

export class Dot implements IDrawable {
  constructor(private currentPosition: ICoordinates = Dot.DEFAULT_POSITION) {}

  private lastPositionUpdate: number = Date.now();
  private targetPosition: ICoordinates;
  private speed: number = 500; // pixels per second // TODO: make configurable
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

  public static get DEFAULT_POSITION() {
    return { x: 0, y: 0 };
  }
}
