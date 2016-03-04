define(function (require, exports, module) {

    var common_url = "";
    (function () {
        if (window.location.hostname === "static.luck.dxt.cn") {
            common_url = "http://luck.dxt.cn/";
        } else {
            common_url = "http://luck.dxt.cn/";
        }
    })();

    var URL = {
        login_phone: "http://user.dxt.cn/v2/login/phone",
    };
    //下面是组件的url
    var m_URL = {
        home: "./views/home.html",
        search_res: "./views/search_res.html",
        error: "./views/error.html"
    };
    exports.get = function (name) {
        if (URL[name]) {
            return URL[name];
        } else if (m_URL[name]) {
            return m_URL[name];
        } else {
            return console.log("error", "木有找到URL[" + name + "],是不是忘记在url.js中定义了？");
        }
    };
});
