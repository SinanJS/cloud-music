//构建路由表
seajs.use(['director', 'gethtml'], function (Router, Dom) {
    var d = new Dom();
    var list = function (name) {
        return function () {
            d.getDom(name);
        };
    };

    var routes = {
        '/home': list('home'),
        '/search_res': list('search_res'),
        '/error': list('error')
    };
    if (!location.hash) {
        location.hash = '#/home';
    }

    $(window).bind('hashchange', function () {
        if (!location.hash) {
            location.hash = '#/home';
        } else if (!routes[location.hash.substr(1)]) {
            location.hash = '#/error';
        }
    });


    var router = Router(routes);
    router.init();

});
