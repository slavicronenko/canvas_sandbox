export interface ICoordinates {
  x: number;
  y: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IDrawable extends Object {
  draw(context: CanvasRenderingContext2D): void;
}
