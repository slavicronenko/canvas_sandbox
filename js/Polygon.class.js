(function(window){
    'use strict';

    window.VRCANVAS.Polygon = function(properties){
        if(typeof properties.coordinates !== 'object'){
            throw new Error('Polygon properties should contain "coordinates" array!');
        }

        var i;

        for (i in properties) {
            if (properties.hasOwnProperty(i)) {
                this[i] = properties[i];
            }
        }
    };
    Object.setPrototypeOf(window.VRCANVAS.Polygon.prototype, window.VRCANVAS.Part.prototype);
    window.VRCANVAS.Polygon.prototype.render = function (context) {
        var c = this.coordinates;

        this.reset(context);

        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeStyle;

        if (typeof c === 'object') {
            var i = 0,
                l = c.length,
                x,
                y;

            for (i; i < l; i += 1) {
                if (!!c[i].x) {
                    x = c[i].x;
                } else {
                    x = !!c[i - 1].x ? c[i - 1].x : 0;
                    c[i].x = c[i - 1].x;
                }

                if (!!c[i].y) {
                    y = c[i].y;
                } else {
                    y = !!c[i - 1].y ? c[i - 1].y : 0;
                    c[i].y = c[i - 1].y;
                }

                if (i === 0 || c[i].action === 'move') {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            }

            context.stroke();
        }
    };
}(window));