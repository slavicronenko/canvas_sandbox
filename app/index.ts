import './style.scss';
import { Scene } from './Scene';
import { Chaser } from './Chaser';
import { Point } from './Point';

const scene = new Scene();
const dot1 = new Chaser({ position: new Point(0, 0), speed: 500 });
const dot2 = new Chaser({ position: new Point(500, 0), speed: 400 });
const dot3 = new Chaser({ position: new Point(0, 500), speed: 300 });
const dot4 = new Chaser({ position: new Point(500, 500), speed: 200 });

scene.add(dot1);
scene.add(dot2);
scene.add(dot3);
scene.add(dot4);
scene.addEventListener('mousemove', ({ targetCoordinates: { x, y } }) => dot1.setTargetPosition(new Point(x, y)));
scene.addEventListener('mousemove', ({ targetCoordinates: { x, y } }) => dot2.setTargetPosition(new Point(x, y)));
scene.addEventListener('mousemove', ({ targetCoordinates: { x, y } }) => dot3.setTargetPosition(new Point(x, y)));
scene.addEventListener('mousemove', ({ targetCoordinates: { x, y } }) => dot4.setTargetPosition(new Point(x, y)));
