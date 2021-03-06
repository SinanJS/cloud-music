seajs.use(['director', 'gethtml', 'playlist','vue.min','url','storage'], function (Router, Dom, Playlist,Vue,urlList,storage) {
    var d = new Dom();
    var storage=new storage();
    var list = function (name) {
        return function () {
            d.getDom(name);
        };
    };

    var routes = {
        '/home': list('home'),
        '/search_res': list('search_res'),
        '/error': list('error'),
        '/song':list('song')
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
        //初始化
        init:function(){
            var u_t=storage.getItem('u_t');
            if(!!u_t){
                $('#id-btns').hide();
                $("#user-info").show();
                var userInfo=new Vue({
                    el:"#user-info",
                    data:{
                        nick_name:u_t.nick_name
                    }
                });

            }
            return u_t;
        },
        //注销
        logout:function(user_id) {
            $.get(urlList.get('u_logout'),{"user_id":user_id},function(res){
                console.log(res);
                if(res.status==='success'){
                    storage.removeItem('u_t');
                    $("#id-btns").show();
                    $("#user-info").hide();
                }else {
                    console.log("logout error");
                }
            });
        },
        //登录
        login:function(){
            $.get(urlList.get('login'),function(res){
                $('body').append(res);
            });
        },
        //注册
        signIn:function(){
            $.get(urlList.get('sign_in'),function(res){
                $('body').append(res);
            });
        },
        //搜索
        search:function(event){
            if(event.keyCode===13){
                var keywords=$('#search-input').val();
                var page=1;
                $.ajax({
                    url:urlList.get('u_search'),
                    type:"GET",
                    data:{
                        q:keywords,
                        page:page,
                        size:50
                    },
                    success:function(res){
                        console.log(res);
                    }
                });
            }
        }
    };


    //执行，绑定事件
    var tmplCtrl=new TemplateCtrl();
    //初始化
    var u_t=tmplCtrl.init();

    $('#btn-login').bind('click',function(){
        tmplCtrl.login();
    });
    $('#btn-sign').bind('click',function(){
        tmplCtrl.signIn();
    });
    $("#logout").bind('click',function(){
        tmplCtrl.logout(storage.getItem('u_t').user_id);
    });

    $('#search-input').keypress(function(e){
       tmplCtrl.search(e);
    });

});
