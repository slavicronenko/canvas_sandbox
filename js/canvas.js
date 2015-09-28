'use strict';

var VRCANVAS = window.VRCANVAS || function (window) {
    window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }();

    return {};
}(window);