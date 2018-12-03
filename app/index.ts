import './style.scss';
import { CanvasContext } from './CanvasContext';
import { Dot } from './Dot';
import { Point } from './Point';

// TODO: Add Point class

const context = new CanvasContext();
const dot1 = new Dot({ position: new Point(0, 0), speed: 500 });
const dot2 = new Dot({ position: new Point(500, 0), speed: 400 });
const dot3 = new Dot({ position: new Point(0, 500), speed: 300 });
const dot4 = new Dot({ position: new Point(500, 500), speed: 200 });

context.add(dot1);
context.add(dot2);
context.add(dot3);
context.add(dot4);
context.addEventListener('mousemove', ({ targetCoordinates: { x, y } }) => dot1.setTargetPosition(new Point(x, y)));
context.addEventListener('mousemove', ({ targetCoordinates: { x, y } }) => dot2.setTargetPosition(new Point(x, y)));
context.addEventListener('mousemove', ({ targetCoordinates: { x, y } }) => dot3.setTargetPosition(new Point(x, y)));
context.addEventListener('mousemove', ({ targetCoordinates: { x, y } }) => dot4.setTargetPosition(new Point(x, y)));
