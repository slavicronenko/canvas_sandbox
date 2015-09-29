(function(window){
    'use strict';

    window.VRCANVAS.Circle = function(properties){
        var i;

        for (i in properties) {
            if (properties.hasOwnProperty(i)) {
                this[i] = properties[i];
            }
        }
    };
    Object.setPrototypeOf(window.VRCANVAS.Circle.prototype, window.VRCANVAS.Part.prototype);
    window.VRCANVAS.Circle.prototype.render = function (context) {
        this.reset(context);
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = this.fillStyle;
        context.fill();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeStyle;
        context.stroke();
    };
}(window));