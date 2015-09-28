(function (window) {
    'use strict';

    window.VRCANVAS.Parts = function () {
        Object.defineProperty(this, 'parts', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: []
        });
    };
    window.VRCANVAS.Parts.prototype = {
        renderAll: function (context) {
            var i = 0,
                l = this.parts.length;

            for (i; i < l; i += 1) {
                this.parts[i].render(context);
            }
        },
        add: function (item) {
            if (typeof item.render === 'function') {
                this.parts.push(item);
            } else {
                throw new Error('This item have no "render" method!');
            }
        }
    };
}(window));