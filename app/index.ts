import './style.scss';
import { CanvasContext } from './CanvasContext';
import { Dot } from './Dot';

// TODO: Add Coordinates class

const context = new CanvasContext();
const dot1 = new Dot({ position: { x: 0, y: 0 }, speed: 500 });
const dot2 = new Dot({ position: { x: 500, y: 0 }, speed: 400 });
const dot3 = new Dot({ position: { x: 0, y: 500 }, speed: 300 });
const dot4 = new Dot({ position: { x: 500, y: 500 }, speed: 200 });

context.add(dot1);
context.add(dot2);
context.add(dot3);
context.add(dot4);
context.addEventListener('mousemove', ({ targetCoordinates: newPosition }) => dot1.setTargetPosition(newPosition));
context.addEventListener('mousemove', ({ targetCoordinates: newPosition }) => dot2.setTargetPosition(newPosition));
context.addEventListener('mousemove', ({ targetCoordinates: newPosition }) => dot3.setTargetPosition(newPosition));
context.addEventListener('mousemove', ({ targetCoordinates: newPosition }) => dot4.setTargetPosition(newPosition));
