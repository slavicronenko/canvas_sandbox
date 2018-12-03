import { ICoordinates } from './interfaces';

export function random(min: number = 0, max: number = Number.MAX_SAFE_INTEGER, precision: number = 0): number {
  return +(Math.random() * (max - min) + min).toFixed(precision);
}

export function generateString(size: number = 6, chars: string = 'abcdefghijklmnopqrstuvwxyz'): string {
  return Array(size)
    .fill(null)
    .map(() => chars[random(0, chars.length - 1)])
    .join('');
}

export function getDistanceBetween(a: ICoordinates, b: ICoordinates) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function getNextPosition(
  current: ICoordinates,
  target: ICoordinates,
  speed: number,
  lastPositionUpdate: number
): ICoordinates {
  const timePassed = (Date.now() - lastPositionUpdate) / 1000;
  const timeToArrive = getDistanceBetween(current, target) / speed;
  const difference = { x: target.x - current.x, y: target.y - current.y };
  const distance = { x: (difference.x / timeToArrive) * timePassed, y: (difference.y / timeToArrive) * timePassed };

  return {
    x: distance.x < Math.abs(difference.x) ? current.x + distance.x : target.x,
    y: distance.y < Math.abs(difference.y) ? current.y + distance.y : target.y
  };
}
