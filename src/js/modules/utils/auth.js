var $ = require('jquery');
var toastr = require("toastr");
var cookies = require('./cookies');
var queryParams = require('./query-params');

function detectToken() {
    if (cookies('enketo_token')) {
        return cookies('enketo_token');
    } else if (queryParams.has('token')) {
        return queryParams.get('token');
    }
    return null;
}

function handleAuthenticationRequiredErrors() {
    $( document ).ajaxError(function(event, xhr) {
        if (xhr.status === 401) {
            toastr.error('This survey is not accessible to guest users. Please login before continuning.', 'Authentication Needed', {
                timeOut: 0,
                extendedTimeOut: 0,
                tapToDismiss: false
            });
        }
    });
}

module.exports = (function() {
    var token;
    /**
     * If token is found, set it in the request header
     */
    if (token = detectToken()) {
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token)
            }
        })
    }
    // Also, handle 401 responses and display user the right message
    handleAuthenticationRequiredErrors();
})()