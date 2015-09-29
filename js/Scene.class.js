(function (window) {
    'use strict';

    window.VRCANVAS.Scene = function (id) {
        var $this = this;

        Object.defineProperty(this, 'canvas', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: document.getElementById(id)
        });

        if (!this.canvas) {
            throw new Error('DOM Element "' + id + '" not found!');
        }

        Object.defineProperty(this, 'context', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: this.canvas.getContext('2d')
        });

        Object.defineProperty(this, 'parts', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: new window.VRCANVAS.Parts()
        });

        (function animloop() {
            window.requestAnimFrame(animloop);
            $this.context.clearRect(0, 0, $this.canvas.width, $this.canvas.height);
            $this.parts.renderAll($this.context);
        })();
    };
    window.VRCANVAS.Scene.prototype = {
        getContext: function () {
            return this.context;
        },
        addPart: function (item) {
            this.parts.add(item);
        },
        renderAll: function(){
            this.parts.renderAll(this.context);
        }
    };
}(window));