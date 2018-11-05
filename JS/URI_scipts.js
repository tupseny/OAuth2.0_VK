function uri_get_params(uri){
    let params = {};
    let indexToSearch = uri.indexOf('?') + 1;
    if (indexToSearch === 0) {
        indexToSearch = uri.indexOf('#') + 1;
        if (indexToSearch === 0) {
            return params;
        }
    }

    let queryString = uri.substr(indexToSearch);
    let queryArray = queryString.split('&');
    queryArray.forEach(function (param) {
        let pair = param.split('=');
        params[pair[0]] = pair[1];
    });

    return params;
}

function uri_get_param(uri, param){
    let res = new RegExp('[\/?&#]' + param + '=([^&#]*)').exec(uri);
    return res[1] || 0;
}

function build_query_data(data) {
    let query_args = [];
    for (let key in data){
        query_args.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }

    if (query_args.length === 0)
        return "";

    return query_args.join('&');
}