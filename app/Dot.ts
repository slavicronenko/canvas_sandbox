import { ICoordinates, IDrawable, ISize } from './interfaces';

export class Dot implements IDrawable {
  constructor(private currentPosition: ICoordinates = Dot.DEFAULT_POSITION) {}

  private size: ISize = {
    width: 1,
    height: 1
  };

  public move({ x, y }: ICoordinates): void {
    this.currentPosition = { x, y };
  }

  public draw(context: CanvasRenderingContext2D): void {
    const { x, y } = this.currentPosition;
    const { width, height } = this.size;

    context.beginPath();
    context.strokeRect(x, y, width, height);
  }

  public static get DEFAULT_POSITION() {
    return { x: 0, y: 0 };
  }
}
