// 所有模块都通过 define 来定义
define(function (require, exports, module) {
    // 通过 require 引入依赖
    var Vue = require('vue');
    var Router = require('director');

    var app = {};
    app.prototype = {
        routers: {
            '/sys': help.randerFn({
                id: "#router-view",
                templateUrl: "content/system.html"
            })
        }
    };
    //路由表


    if (!window.location.hash) {
        window.location.hash = "#/sys";
    }
    var router = Router(routes);
    router.init();

});
seajs.use(['./help', 'storage', 'url', 'vue.min', 'director'], function (Help, Storage, url, Vue, Director) {

});
