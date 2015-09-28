(function(window){
    'use strict';

    window.VRCANVAS.Box = function(properties){
        var i;

        for (i in properties) {
            if (properties.hasOwnProperty(i)) {
                this[i] = properties[i];
            }
        }
    };
    Object.setPrototypeOf(window.VRCANVAS.Box, window.VRCANVAS.Part.prototype);
    window.VRCANVAS.Box.prototype.render = function (context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.fillStyle;
        context.fill();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeStyle;
        context.stroke();
    };
}(window));