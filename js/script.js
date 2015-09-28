(function (window) {
    'use strict';

    var VRCANVAS = window.VRCANVAS,
        scene;

    if (!!VRCANVAS.Scene) {
        scene = new VRCANVAS.Scene('workspace');

        scene.addPart(new Box({
            x: 100,
            y: 150,
            width: 200,
            height: 200,
            fillStyle: '#0f0',
            lineWidth: 10,
            strokeStyle: '#f00'
        }));
    }
}(window));