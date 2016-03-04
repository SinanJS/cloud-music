define(function (require, exports, module) {
    var $ = require('jquery');
    var url = require('url');

    var _html = function () {

    };
    _html.prototype = {
        getDom: function (name, id) {

            var _id = id ? id : "#view_main";

            $.get(url.get(name), function (res) {
                $(_id).html(res);
            });
        }
    };
    var _h = Object.create(_html.prototype);
    module.exports = _html;
});
