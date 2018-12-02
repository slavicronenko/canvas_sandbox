import { ICoordinates, IDrawable, ISize } from './interfaces';
import { getDistanceBetween } from './util';

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

  public draw(context: CanvasRenderingContext2D): void { // TODO: move formulas to utility methods
    const { width, height } = this.size;
    let nextPosition;

    if (!this.targetPosition) {
      nextPosition = this.currentPosition;
    } else if (this.currentPosition === this.targetPosition) {
      nextPosition = this.currentPosition;
      this.targetPosition = null;
    } else {
      const { x: Cx, y: Cy} = this.currentPosition;
      const { x: Tx, y: Ty} = this.targetPosition;
      const timePassed = (Date.now() - this.lastPositionUpdate) / 1000;
      const distanceLeft = getDistanceBetween(this.currentPosition, this.targetPosition);
      const timeToArrive = distanceLeft / this.speed;
      const Dx = ((Tx - Cx) / timeToArrive) * timePassed;
      const Dy = ((Ty - Cy) / timeToArrive) * timePassed;

      const Nx = Dx < Math.abs(Tx - Cx) ? Cx + ((Tx - Cx) / timeToArrive) * timePassed : Tx;
      const Ny = Dy < Math.abs(Ty - Cy) ? Cy + ((Ty - Cy) / timeToArrive) * timePassed : Ty;

      nextPosition = {
        x: Nx,
        y: Ny
      };
    }

    context.beginPath();
    context.strokeRect(nextPosition.x, nextPosition.y, width, height);
    this.currentPosition = nextPosition;
    this.lastPositionUpdate = Date.now();
  }

  public static get DEFAULT_POSITION() {
    return { x: 0, y: 0 };
  }
}
