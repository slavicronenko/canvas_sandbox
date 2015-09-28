(function(window){
    'use strict';

    window.VRCANVAS.Part = function(){};
    window.VRCANVAS.Part.prototype.render = function(){
        throw new Error('You should redefine this method!');
    };
}(window));