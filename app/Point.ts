import { ICoordinates } from './interfaces';

export class Point implements ICoordinates {
  constructor(public x: number, public y: number) {}

  public distanceTo(b: Point): number {
    return Point.calculateDistance(this, b);
  }

  public equalsTo(b: Point): boolean {
    return Point.isEqual(this, b);
  }

  public getNextPosition(target: Point, speed: number, timeFrame: number) {
    return Point.calculateNextPoint(this, target, speed, timeFrame);
  }

  public static isEqual(a: Point, b: Point): boolean {
    return a && b && a.x === b.x && a.y === b.y;
  }

  public static calculateDistance(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  public static calculateNextPoint(
    current: Point,
    target: Point,
    speed: number,
    timeFrame: number
  ): Point {
    const timeToArrive = current.distanceTo(target) / speed;
    const difference = { x: target.x - current.x, y: target.y - current.y };
    const distance = {
      x: (difference.x / timeToArrive) * timeFrame,
      y: (difference.y / timeToArrive) * timeFrame
    };

    return new Point(
      distance.x < Math.abs(difference.x) ? current.x + distance.x : target.x,
      distance.y < Math.abs(difference.y) ? current.y + distance.y : target.y
    );
  }
}
