import { CanvasContext } from './CanvasContext';
import { ICoordinates, IDrawable, ISize } from './interfaces';

export class Dot implements IDrawable {
  constructor(settings: IDotSettings) {
    this.context = settings.context;
    this.currentPosition = settings.position ? settings.position : { x: 0, y: 0 };

    this.context.add(this);
  }

  private context: CanvasContext;
  private readonly currentPosition: ICoordinates;
  private size: ISize = {
    width: 1,
    height: 1
  };

  public move({ x, y }: ICoordinates): void {
    console.log(`moving to ${x}:${y}`);
  }

  public draw(context: CanvasRenderingContext2D): void {
    const { x, y } = this.currentPosition;
    const { width, height } = this.size;

    console.log(x, y, width, height);
    context.beginPath();
    context.strokeRect(x, y, width, height);
  }
}

interface IDotSettings {
  context: CanvasContext;
  position?: ICoordinates;
}
