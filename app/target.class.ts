import { Point } from './point.class';
import { ITrackable } from './interfaces';

export class TargetClass {
  constructor(tracked: ITrackable) {
    this.tracked = tracked;
    this.update();
  }

  private readonly tracked: ITrackable;
  private readonly trace: ITraceData[] = [];

  public update(): void {
    const position = this.tracked.getCurrentPosition();

    if (position) {
      const time = Date.now();
      let speed = null;
      let acceleration = null;

      if (this.trace.length) {
        const {
          position: lastPosition,
          time: lastUpdate,
          speed: lastSpeed
        } = this.trace[this.trace.length - 1];
        const secondsPassed = (1000 / (time - lastUpdate));

        if (lastPosition) {
          speed = lastPosition.distanceTo(position) * secondsPassed;

          if (lastSpeed) {
            acceleration = (speed - lastSpeed) * secondsPassed;
          }
        }
      }

      this.trace.push({ time, position, speed, acceleration });

      if (this.trace.length > TargetClass.MAX_TRACE_LENGTH) {
        this.trace.shift();
      }
    }
  }

  public get position(): Point | null {
    return this.trace.length ? this.trace[this.trace.length - 1].position : null;
  }

  public get speed(): number | null {
    return this.trace.length ? this.trace[this.trace.length - 1].speed : null;
  }

  public get acceleration(): number | null {
    return this.trace.length ? this.trace[this.trace.length - 1].acceleration : null;
  }

  private static get MAX_TRACE_LENGTH() {
    return 10;
  }
}

export interface ITraceData {
  time: number;
  position: Point;
  speed: number;
  acceleration: number;
}
