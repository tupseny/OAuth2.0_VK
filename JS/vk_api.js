function friends_get(access_token, count, func) {
    if (typeof count === 'function') {
        func = count;
        count = '';
    }

    $.ajax({
        url: VK_METHOD_URI + 'friends.get',
        dataType: 'jsonp',
        data: {
            order: 'name',
            count: count,
            fields: 'online',
            access_token: access_token,
            v: VK_API_VERSION
        }
    }).done(function (data) {
        if (data.hasOwnProperty('response'))
            func(data.response);
        else if (data.hasOwnProperty('error'))
            handle_error(data);
    }).fail(function (error) {
        console.warn(error);
    });
}

function account_get_profile(access_token, func) {
    $.ajax({
        url: VK_METHOD_URI + 'users.get',
        dataType: 'jsonp',
        data: {
            access_token: access_token,
            v: VK_API_VERSION
        }
    }).done(function (data) {
        if (data.hasOwnProperty('error')) {
            handle_error(data);
        } else if (data.hasOwnProperty('response'))
            func(data.response);
    }).fail(function (err) {
        console.warn(err);
    });
}

function handle_error(error) {
    console.warn(error);
    const errorCode = error.error.error_code;
    const res = solve_error(errorCode);
    if (res) {
        let txt = document.createElement('p');
        txt.textContent = res;
        document.body.appendChild(txt);
    }
}

function solve_error(errorCode) {
    switch (errorCode) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 7:
        case 8:
        case 9:
        case 11:
        case 15:
        case 16:
        case 20:
        case 21:
        case 23:
        case 27:
        case 28:
        case 29:
        case 100:
        case 101:
        case 113:
        case 150:
        case 500:
        case 600:
        case 603:
            return "Не удалось автоматически решить проблему. Свяжитесь с разработчиком. \n Код ошибки: " + errorCode;
        case 6:
            //many request in sec
            break;
        case 10:
            //server is down
            break;
        case 14:
            //captcha
            break;
        case 17:
            //validation required
            break;
        case 18:
            //the page is deleted
            break;
        case 24:
            //confirmation
            break;
        case 30:
            //private profile
            break;
        case 200:
            //album is private
            break;
        case 201:
            //audio is private
            break;
        case 203:
            //group is private
            break;
        case 300:
        //album is full
            break;
        case 5:
            //another ip address, client
            logout();
    }
    return 0;
}