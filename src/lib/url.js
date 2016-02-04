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
        verify_code: "http://user.dxt.cn/verify/code",
        register_phone: "http://user.dxt.cn/v2/register",
        banner: common_url + "game/yydb/home",
        hot: common_url + "game/yydb/list/hot",
        detail: common_url + "game/yydb/detail",
        user_list: common_url + "game/yydb/user/list"
    };
    //下面是组件的url
    var m_URL = {
        top_bar: "../../module/top-bar/top-bar.html",
        logo_bar: "../../module/logo-bar/logo-bar.html",
        search: "../../module/search-input/search-input.html",
        nav_bar: "../../module/nav-bar/nav-bar.html",
        hot_goods: "../../module/hot-goods/hot-goods.html",
        winner_box: "../../module/winner-box/winner-box.html",
        login_ways: "../../module/login-ways/login-ways.html",
        share_box: "../../module/share-box/share-box.html",
        page_bar: "../../module/page-bar/page-bar.html",
        shaidan_box: "../../module/shaidan-box/shaidan-box.html",
        footer_bar: "../../module/footer/footer-bar.html",
        record_table: "../../module/record-table/record-table.html",
        winning_record: "../../module/winning-record/winning-record.html",
        announced_box: "../../module/announced-box/announced-box.html"
    }
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
