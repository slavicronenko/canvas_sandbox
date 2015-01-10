(function () {
    'use strict';

    function CanvasSandbox() {
        var ctx;

        /**
         * Function for checking required properties.
         * @param settings {object} object to check
         * @param properties {object} array with required properties
         * @returns {boolean}
         */
        function checkSettings(settings, properties) {
            var i = 0,
                l = properties.length,
                result = true;

            for (i; i < l; i += 1) {
                if (!settings.hasOwnProperty(properties[i])) {
                    result = false;
                }
            }

            return result;
        }

        /**
         * Initialization
         * @param id {string} element id
         */
        this.init = function (id) {
            if (typeof id === 'string') {
                this.element = document.getElementById(id);

                if (!!this.element) {
                    this.element.width = window.innerWidth;
                    this.element.height = window.innerHeight;

                    this.context = this.element.getContext('2d');
                    ctx = this.context;
                    ctx.fillStyle = '#fff';
                    ctx.lineStyle = "#000";
                }
            }

            return this;
        };

        /**
         * Drawign a poligon
         * @param {object} c array with coordinates
         * @returns {object} current object
         */
        this.poligon = function (c) {
            if (typeof c === 'object') {
                var i = 0,
                    l = c.length,
                    x,
                    y;

                ctx.beginPath();

                for (i; i < l; i += 1) {
                    if (!!c[i].x) {
                        x = c[i].x;
                    } else {
                        x = (!!c[i - 1].x) ? c[i - 1].x : 0;
                        c[i].x = c[i - 1].x;
                    }

                    if (!!c[i].y) {
                        y = c[i].y;
                    } else {
                        y = (!!c[i - 1].y) ? c[i - 1].y : 0;
                        c[i].y = c[i - 1].y;
                    }

                    if (i === 0 || c[i].action === 'move') {
                        ctx.moveTo(x, y);
                    } else {
                        console.log(x, y);
                        ctx.lineTo(x, y);
                    }
                }

                ctx.stroke();

                return this;
            }

            return false;
        };

        /**
         * Drawing a vector line
         * @param settings
         * @returns {object} current object
         */
        this.drawVector = function (settings) {
            if (checkSettings(settings, ['x', 'y', 'angle', 'width'])) {

                return this;
            }

            return false;
        };

        /**
         * Drawing script
         * @returns {object} current object
         */
        this.draw = function () {

            return this;
        };
    }

    $(document).ready(function () {
        (new CanvasSandbox()).init('workspace').draw();
    });
}());