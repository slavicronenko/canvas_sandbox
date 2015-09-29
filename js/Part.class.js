(function(window){
    'use strict';

    window.VRCANVAS.Part = function(){};
    window.VRCANVAS.Part.prototype = {
        render: function(){
            throw new Error('You should redefine this method!');
        },
        reset: function(context){
            context.lineWidth = 1;
            context.strokeStyle = '#000';
            context.fillStyle = '#000';
        }
    };
}(window));