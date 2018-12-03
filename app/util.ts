export function random(min: number = 0, max: number = Number.MAX_SAFE_INTEGER, precision: number = 0): number {
  return +(Math.random() * (max - min) + min).toFixed(precision);
}

export function generateString(size: number = 6, chars: string = 'abcdefghijklmnopqrstuvwxyz'): string {
  return Array(size)
    .fill(null)
    .map(() => chars[random(0, chars.length - 1)])
    .join('');
}
