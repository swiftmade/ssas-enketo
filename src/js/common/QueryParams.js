var UrlSearchParams = require('url-search-params')

class QueryParams {
    urlParams() {
        if (!this._urlParams) {
            this._urlParams = new UrlSearchParams(
                window.location.search
            )
        }
        return this._urlParams
    }
    has(key) {
        return this.urlParams().has(key)
    }
    get(key) {
        return this.urlParams().get(key)
    }
    getUrl(uri) {
        var url = '';
        if (this.has('base')) {
            url = this.get('base') + '/';
        }
        return url + uri;
    }
    getPath(key) {
        return this.getUrl(this.get(key))
    }
}

export default new QueryParams()