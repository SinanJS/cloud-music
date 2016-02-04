// 所有模块都通过 define 来定义
define(function (require, exports, module) {
    var $ = require('jquery');

    var Xhr = {
        get: function (data, url, callback) {
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                dataType: "json",
                success: function (res) {
                    callback(res);
                }
            });
        },
        getSearch: function (url) {
              try {
                var url = url ? url : window.location.search;
                url = url.split('?')[1].split('&');
                var len = url.length;
                var result = {};
                for (var i = 0; i < len; i++) {
                    var t = url[i].split('=');
                    result[t[0]] = t[1];
                }
                return result;
            } catch (error) {
                console.log(error.message);
            }

        }
    }
    module.exports = Xhr;
});
