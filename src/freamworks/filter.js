// 所有模块都通过 define 来定义
define(function (require, exports, module) {

    // 通过 require 引入依赖
    var Vue = require('vue');


    var Filter = {
        sub: function (val) {
            Vue.filter('sub', function (val, n) {
                if (!!val && typeof val === 'string') {
                    return val.substr(0, n) + "...";
                }
            });
        }
    };
    module.exports = Filter;
});
