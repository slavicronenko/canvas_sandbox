'use strict';

function CanvasSandbox(){
    this.element;
    this.context;

    this.init = function (id){
        if(typeof id === 'string'){
            this.element = document.getElementById(id);

            if(!!this.element){
                this.element.width = window.innerWidth;
                this.element.height = window.innerHeight;

                this.context = this.element.getContext('2d');
            }
        }

        return this;
    };

    this.draw = function () {

    }
}

$(document).ready(function(){
    (new CanvasSandbox()).init('workspace').draw();
});