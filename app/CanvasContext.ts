import { generateString } from './util';
import { ICanvasMouseEvent, IDrawable } from './interfaces';

export class CanvasContext {
  constructor(settings: ICanvasContextSettings = CanvasContext.DEFAULT_SETTINGS) {
    const {
      element,
      id,
      width,
      height
    } = Object.assign({}, CanvasContext.DEFAULT_SETTINGS, settings);

    const existingElement = document.getElementById(id) as HTMLCanvasElement;

    if (existingElement && !existingElement.hasOwnProperty('getContext')) {
      throw new Error(`Element with id (${id}) exists and it's not a canvas element!`);
    }

    this.canvasElement = element || existingElement || CanvasContext.createCanvasElement(id, width, height);
    this.context = this.canvasElement.getContext('2d');

    document.body.appendChild(this.canvasElement);
    this.play();
  }

  private readonly canvasElement: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly entities: IDrawable[] = [];
  private currentFrameId: number;

  public add(entity: IDrawable): void {
    this.entities.push(entity);
  }

  public addEventListener(type: string, callback: (event: ICanvasMouseEvent) => void): void {
    this.canvasElement.addEventListener(type, this.createEventHandler(type, callback));
  }

  private createEventHandler(type, callback): (event: Event) => void {
    const handlers = {  // TODO: find more elegant way
      click: (event: MouseEvent): void => {
        callback(Object.assign(event, {
          targetCoordinates: {
            x: event.clientX - this.canvasElement.offsetLeft,
            y: event.clientY - this.canvasElement.offsetTop
          }
        }));
      }
    };

    return handlers[type] || callback;
  }

  private play(): void {
    this.redraw();
    this.currentFrameId = requestAnimationFrame(this.play.bind(this));
  }

  private redraw(): void {
    this.clear();
    this.entities.forEach((entity) => entity.draw(this.context));
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  private static createCanvasElement(id: string, width: number, height: number): HTMLCanvasElement {
    const newElement = document.createElement('canvas');

    newElement.setAttribute('id', id);
    newElement.setAttribute('width', width.toString());
    newElement.setAttribute('height', height.toString());

    return newElement;
  }

  private static get DEFAULT_SETTINGS(): ICanvasContextSettings {
    return {
      id: generateString(),
      width: 500,
      height: 500
    };
  }
}

export interface ICanvasContextSettings {
  element?: HTMLCanvasElement;
  id?: string;
  width?: number;
  height?: number;
}
