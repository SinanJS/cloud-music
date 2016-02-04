// 所有模块都通过 define 来定义
define(function (require, exports, module) {
    var $ = require('jquery');
    var Vue = require('vue');

    var WebModule = function (cmptName, opt) {
        this.vue = {};
        this.el = opt.el;
        opt.cmptName = cmptName;
        this.option = opt;
    };
    // WebModule.prototype = new Vue();
    WebModule.prototype.getHtmlModule = function (callback) {
        var el = this.el;
        var cmpt = this.option.cmptName;
        var opt = this.option;

        $.ajax({
            url: opt.htmlUrl,
            type: "GET",
            success: function (res) {
                callback(el, cmpt, opt, res);
            }
        });
        return this;
    };

    WebModule.prototype.loadModule = function (el, cmpt, _opt, _html) {

        var opt = _opt ? _opt : {};
        var data = opt.data ? opt.data : {
            haha: "adfsdf"
        };
        if (opt.loading) {
            $(opt.loading).hide();
        }
        Vue.component(cmpt, Vue.extend({
            props: {
                option: {
                    type: Object,
                    default: opt
                }
            },
            template: _html
        }));
        this.vue = new Vue({
            el: el
        });
    };
    module.exports = WebModule;

});
