(function () {
    'use strict';

    function CanvasSandbox() {
        var ctx,
            element;

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
                element = document.getElementById(id);

                if (!!element && !!element.getContext) {
                    element.width = window.innerWidth;
                    element.height = window.innerHeight;

                    this.context = element.getContext('2d');
                    ctx = this.context;
                    ctx.fillStyle = '#fff';
                    ctx.lineStyle = "#000";
                }
            }

            return this;
        };

        /**
         * Setter of context properties
         * @param {string || object} key Property name or object with key/value properties
         * @param {string} value of property (not used if "key" parameter is object)
         */
        this.settings = function (key, value) {
            if (typeof key === 'string' && !!key && !!value) {
                if (ctx.hasOwnProperty(key)) {
                    ctx[key] = value;
                } else if (typeof ctx[key] === 'function') {
                    if (typeof value === 'object') {
                        ctx[key].apply(ctx, value);
                    } else {
                        ctx[key](value);
                    }
                }
            } else if (typeof key === 'object' && !!key) {
                var i;

                for (i in key) {
                    if (ctx.hasOwnProperty(i)) {
                        ctx[i] = key[i];
                    }
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
            this.settings({
                lineWidth: 10,
                lineCap: 'butt',
                globalAlpha: 0.5,
                lineDashOffset: 2
            }).settings(
                'setLineDash',
                [[4, 16]]
            ).poligon([
                {x: 100,y: 100},
                {x: 200,y: 200}
            ]).poligon([
                {x: 100,y: 200},
                {x: 200,y: 100}
            ]);

            return this;
        };
    }

    $(document).ready(function () {
        var sandbox = new CanvasSandbox();

        sandbox.init('workspace').draw();
    });
}());