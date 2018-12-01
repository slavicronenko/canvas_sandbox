import './style.scss';
import { CanvasContext } from './CanvasContext';
import { Dot } from './Dot';

const context = new CanvasContext();
const dot = new Dot();

context.add(dot);
dot.move({ x: 10, y: 20 });

context.addEventListener('click', ({ targetCoordinates: newPosition }) => dot.move(newPosition));
