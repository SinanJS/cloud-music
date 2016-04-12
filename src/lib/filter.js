// 所有模块都通过 define 来定义
define(function (require, exports, module) {

    // 通过 require 引入依赖
    var Vue = require('vue');


    var Filter = {
        sub: function () {
            Vue.filter('sub', function (val, n) {
                if (!!val && typeof val === 'string') {
                    return val.substr(0, n) + "...";
                }
            });
        },
        numToDate: function () {
            Vue.filter('numToDate', function (val) {
                var date = new Date(parseInt(val));
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();

                var t = date.toTimeString().substr(0, 8);
                var ms = date.getMilliseconds();

                var dateTime = y + '-' + m + '-' + d + ' ' + t + "." + ms;
                return dateTime;
            });
        },
        msToMin:function(){
            Vue.filter('msToMin', function (val) {
                var time=new Date(val);
                var min=time.getMinutes();
                var s=time.getSeconds();
                if(min<10){
                    min="0"+min.toString();
                }
                if(s<10){
                    s= "0"+ s.toString();
                }
                return min.toString()+":"+ s.toString();
            });
        }
    };
    module.exports = Filter;
});
