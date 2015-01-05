'use strict';

$(document).ready(function(){
    var canvas,
        workspace;

    function init(id){
        if(typeof id === 'string'){
            canvas = document.getElementById(id);

            if(!!canvas){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                workspace = canvas.getContext('2d');
            }
        }
    }

    init('workspace');
});