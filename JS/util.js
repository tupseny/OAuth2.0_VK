function form_insert_args(form, args) {
    for (let e in args) {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', e);
        input.setAttribute('value', args[e]);
        form.append(input);
    }
}

function redirect(url, method, data) {
    data = data || {};
    if (typeof method === "undefined")
        method = 'GET';
    if (typeof method === 'object')
        data = method;

    let form = document.createElement('form');
    form.setAttribute('type', 'hidden');
    form.setAttribute('method', method);
    form.setAttribute('action', url);
    form_insert_args(form, data);
    $(document.body).append(form);
    form.submit();
}

function replaceTempCookie(key, newValue, expires) {
    replaceCookie(key, newValue, {expires: expires});
}

function replaceCookie(key, newValue, options) {
    deleteCookie(key);
    setCookie(key, newValue, options)
}

function getCookie(key) {
    const cookieObj = getCookieObject();

    if (cookieObj.hasOwnProperty(key))
        return cookieObj[key];
    else
        return 0;
}

function getCookieObject() {
    let cookie = document.cookie;
    cookie = cookie.split('; ');

    let cookieObj = {};
    cookie.forEach(function (e) {
        let pair = e.split('=');
        const key = pair[0];
        const value = pair[1];

        cookieObj[key] = value;
    });

    return cookieObj;
}

function setTempCookie(key, value, expires) {
    setCookie(key, value, {expires: expires});
}

function setCookie(key, value, options) {
    options = options || {};

    //if max-age


    //if expires
    let expires = options.expires;
    if (typeof expires === "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = key + "=" + value;

    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(key) {
    setCookie(key, "", {
        expires: -1
    })
}