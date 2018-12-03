import { ICoordinates } from './interfaces';

export class Point implements ICoordinates {
  constructor(public x: number, public y: number) {}

  public distanceTo(b: Point): number {
    return Point.calculateDistance(this, b);
  }

  public copy(): Point {
    return new Point(this.x, this.y);
  }

  public equalsTo(b: Point): boolean {
    return Point.isEqual(this, b);
  }

  public static isEqual(a: Point, b: Point): boolean {
    return a && b && a.x === b.x && a.y === b.y;
  }

  public static calculateDistance(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  public static calculateNextPosition( // TODO: pick proper name
    current: Point,
    target: Point,
    speed: number,
    lastPositionUpdate: number
  ): Point {
    const timePassed = (Date.now() - lastPositionUpdate) / 1000;
    const timeToArrive = current.distanceTo(target) / speed;
    const difference = { x: target.x - current.x, y: target.y - current.y };
    const distance = {
      x: (difference.x / timeToArrive) * timePassed,
      y: (difference.y / timeToArrive) * timePassed
    };

    return new Point(
      distance.x < Math.abs(difference.x) ? current.x + distance.x : target.x,
      distance.y < Math.abs(difference.y) ? current.y + distance.y : target.y
    );
  }
}
