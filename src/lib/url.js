define(function (require, exports, module) {

    var common_url = "http://localhost:3000";

    var URL = {
        u_login: common_url+"/login",
        u_signin: common_url+"/sign_in",
        u_logout: common_url+"/logout",
        u_search:common_url+"/search",
        u_song:common_url+"/song",
        u_lyric:common_url+"/lyric",
        u_artist:common_url+"/artist",

    };
    //下面是组件的url
    var m_URL = {
        home: "./views/home.html",
        search_res: "./views/search_res.html",
        error: "./views/error.html",
        login:"./views/login.html",
        sign_in:"./views/sign_in.html",
        song:"./views/song.html",
        artist:"./views/artist.html",
        chat:"./views/chat.html"
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
