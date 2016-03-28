define(function (require, exports, module) {
    var Lstorage = function () {

    };
    Lstorage.prototype.setItem = function (_key, _data, _time) {
        try {

            var time = _time ? _time : 2592000000; //默认在线30天

            if (typeof _data === "object") {
                _data._create_time = new Date().getTime();
                _data._time = time;
                localStorage.setItem(_key, JSON.stringify(_data));
            }

        } catch (e) {
            console.log(e);
        }
    };

    Lstorage.prototype.getItem = function (_key) {
        if (!!localStorage.getItem(_key)) {
            var data = JSON.parse(localStorage.getItem(_key));
            var time = data._time;

            var create_time = data._create_time;

            //过期已经删除
            if (time !== 0 && (create_time + time) < new Date().getTime()) {
                localStorage.removeItem(_key);
                return false;
            } else {
                return data;
            }
        }
    };

    Lstorage.prototype.removeItem = function (_key) {
        if (!!localStorage.getItem(_key)) {
            localStorage.removeItem(_key);
        }
    };

    module.exports = Lstorage;
});
