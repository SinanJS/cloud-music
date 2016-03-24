seajs.use(['director', 'gethtml', 'playlist','vue.min','url'], function (Router, Dom, Playlist,Vue,urlList) {
    var d = new Dom();

    var list = function (name) {
        return function () {
            d.getDom(name);
        };
    };

    var routes = {
        '/home': list('home'),
        '/search_res': list('search_res'),
        '/error': list('error')
    };
    if (!location.hash) {
        location.hash = '#/home';
    }

    $(window).bind('hashchange', function () {
        if (!location.hash) {
            location.hash = '#/home';
        } else if (!routes[location.hash.substr(1)]) {
            location.hash = '#/error';
        }
    });


    var router = Router(routes);
    router.init();

    //playlist
    var pl = new Playlist();
    pl.readList();
    /*$('.jp-playlist-item-remove').click(function () {
        // alert('触发');
        var song_id = $(this).attr('data-id');
        pl.removeItem(song_id);
    });*/
    ///模板页控制器
    var TemplateCtrl=function(){

    };
    TemplateCtrl.prototype={
        login:function(){

        }
    };
    $('#btn-login').bind('click',function(){
        $.get(urlList.get('login'),function(res){
            $('body').append(res);
        });
    });
});
