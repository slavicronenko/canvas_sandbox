(function (window) {
    'use strict';

    var VRCANVAS = window.VRCANVAS,
        scene;

    if (!!VRCANVAS.Scene) {
        scene = new VRCANVAS.Scene('workspace');

        scene.addPart(new VRCANVAS.Box({
            x: 100,
            y: 150,
            width: 200,
            height: 200,
            fillStyle: '#0f0',
            lineWidth: 10,
            strokeStyle: '#f00'
        }));

        scene.addPart(new VRCANVAS.Circle({
            x: 100,
            y: 150,
            r: 20,
            fillStyle: '#fff',
            lineWidth: 0,
            strokeStyle: '#f00'
        }));

        scene.addPart(new VRCANVAS.Polygon({
            lineWidth: 2,
            coordinates: [
                {x: 100, y: 100},
                {x: 200, y: 200},
                {x: 300, y: 200},
                {x: 300, y: 300},
            ]
        }));
    }
}(window));