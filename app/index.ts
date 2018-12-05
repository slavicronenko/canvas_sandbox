import './style.scss';
import { Scene } from './Scene';
import { Chaser } from './Chaser';
import { Point } from './Point';

const scene = new Scene();
const dot1 = new Chaser({ position: new Point(10, 10), speed: 500 });
const dot2 = new Chaser({ position: new Point(490, 10), speed: 500 });
const dot3 = new Chaser({ position: new Point(490, 490), speed: 500 });
const dot4 = new Chaser({ position: new Point(10, 490), speed: 500 });

scene.add(dot1, dot2, dot3, dot4);
dot1.moveTo(scene.trackEvent('mousemove'));
dot2.follow(dot1);
dot3.follow(dot2);
dot4.follow(dot3);
