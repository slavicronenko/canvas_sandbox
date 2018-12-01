import './style.scss';
import { CanvasContext } from './CanvasContext';
import { Dot } from './Dot';

const dot = new Dot({ context: new CanvasContext() });
dot.move({ x: 10, y: 20 });
