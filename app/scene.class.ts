import { generateString } from './util';
import { IDrawable, ITrackable } from './interfaces';
import { Point } from './point.class';

export class Scene {
  constructor(settings: ISceneSettings = Scene.DEFAULT_SETTINGS) {
    const {
      element,
      id,
      width,
      height
    } = Object.assign({}, Scene.DEFAULT_SETTINGS, settings);

    const existingElement = document.getElementById(id) as HTMLCanvasElement;

    if (existingElement && !existingElement.hasOwnProperty('getContext')) {
      throw new Error(`Element with id (${id}) exists and it's not a canvas element!`);
    }

    this.canvasElement = element || existingElement || Scene.createElement(id, width, height);
    this.context = this.canvasElement.getContext('2d');

    document.body.appendChild(this.canvasElement);
    this.play();
  }

  private readonly canvasElement: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly trackedEvents: {[id: string]: Point} = {};  // TODO: pick better name
  private readonly entities: IDrawable[] = [];
  private currentFrameId: number;
  private lastRedrawTime: number = Date.now();

  public add(...entities: IDrawable[]): void {
    this.entities.push(...entities);
  }

  public trackEvent(type: string): ITrackable {  // TODO: pick better name
    this.canvasElement.addEventListener(type, (event: MouseEvent) => {
      this.trackedEvents[type] = new Point(
        event.clientX - this.canvasElement.offsetLeft,
        event.clientY - this.canvasElement.offsetTop
      );
    });

    return {    // TODO: maybe it should be an instance of some event class or something (Point?)
      getCurrentPosition: () => this.trackedEvents[type]
    };
  }

  public addEventListener(type: string, callback: (event: Event) => void): void {
    this.canvasElement.addEventListener(type, callback);
  }

  private play(): void {
    this.redraw();
    this.currentFrameId = requestAnimationFrame(this.play.bind(this));
  }

  private redraw(): void {
    const timePassed = (Date.now() - this.lastRedrawTime) / 1000;
    this.clear();
    this.entities.forEach((entity) => entity.draw(this.context, timePassed));
    this.lastRedrawTime = Date.now();
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  private static createElement(id: string, width: number, height: number): HTMLCanvasElement {
    const newElement = document.createElement('canvas');

    newElement.setAttribute('id', id);
    newElement.setAttribute('width', width.toString());
    newElement.setAttribute('height', height.toString());

    return newElement;
  }

  private static get DEFAULT_SETTINGS(): ISceneSettings {
    return {
      id: generateString(),
      width: 500,
      height: 500
    };
  }
}

export interface ISceneSettings {
  element?: HTMLCanvasElement;
  id?: string;
  width?: number;
  height?: number;
}
