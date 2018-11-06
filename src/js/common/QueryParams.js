var UrlSearchParams = require('url-search-params')
var queryParams = new UrlSearchParams(window.location.search)

queryParams.getPath = function (key) {
    return queryParams.getUrl(queryParams.get(key))
}

queryParams.getUrl = function (uri) {
    var url = '';
    if (queryParams.has('base')) {
        url = queryParams.get('base') + '/';
    }
    return url + uri;
}

export default queryParams;