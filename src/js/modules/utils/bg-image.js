var $ = require('jquery');
var queryParams = require('./query-params');

module.exports = function(selector) {
    $(document).ready(function() {
        if ( ! queryParams.has('bg')) {
            return;
        }

        var style = "content: ' ';"
            + "display: block;"
            + "position: absolute;"
            + "top: 0;"
            + "left: 0;"
            + "width: 100%;"
            + "height: 100%;"
            + "opacity: 0.2;"
            + "z-index: -1;"
            + "background-image: url('" + queryParams.get('bg') + "');"
            + "background-size: cover;"
            + "background-position: center;"
            + "background-repeat: no-repeat;"

        $('<style>' + selector + ':after { ' + style + '} </style>')
            .appendTo('head')
    });
}