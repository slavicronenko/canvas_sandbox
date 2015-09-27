var vrcanvas = (function (window) {
    'use strict';

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var scene = new Scene('workspace');

    scene.addPart(new Box({
            x: 100,
            y: 150,
            width: 200,
            height: 200,
            fillStyle: '#0f0',
            lineWidth: 10,
            strokeStyle: '#f00'
        })
    );
})(window);