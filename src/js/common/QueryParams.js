var UrlSearchParams = require('url-search-params')
var queryParams = new UrlSearchParams(window.location.search)

queryParams.getPath = function (key) {
    var path = '';
    if (queryParams.has('base')) {
        path = queryParams.get('base') + '/';
    }
    return path + queryParams.get(key);
}

queryParams.getUrl = function (uri) {
    var url = '';
    if (queryParams.has('base')) {
        url = queryParams.get('base') + '/';
    }
    return url + uri;
}

export default queryParams;