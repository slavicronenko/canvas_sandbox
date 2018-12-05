import { Point } from './Point';

export interface IPosition {
  x: number;
  y: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface IDrawable extends Object {
  draw(context: CanvasRenderingContext2D, timePassed: number): void;
}

export interface ITrackable {
  getCurrentPosition: () => Point | null;
}
