//构建路由表
seajs.use(['director', 'gethtml', 'tPlayer'], function (Router, Dom, Tplayer) {
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

    //播放器控制：
    var caihualang = 'http://106.3.63.151/m10.music.126.net/20160309132708/76f1357bdae7b659f57c81995669bff3/ymusic/c4eb/37b3/0980/e6ac0ddb84257edd42d5c1cf22a40333.mp3?wshc_tag=0&wsts_tag=56dfae50&wsid_tag=76bad28b&wsiphost=ipdbm';
    var chuangwai = 'http://106.3.63.149/m10.music.126.net/20160309174230/75ba77dac1d3294c6efcddeba189c9ba/ymusic/eb9c/25cc/665d/6b2963a9a8f77620f7dfaef0b31c1d87.mp3?wshc_tag=0&wsts_tag=56dfea2a&wsid_tag=76bad28b&wsiphost=ipdbm';
    var tp = new Tplayer({
        id: 'player'
    });
    $('.jp-play').bind('click', function () {
        tp.changePlay(function () {
            if (tp.isPlaying()) {
                $('.jp-play').hide();
            } else {
                $('.jp-pause').html('播放');
            }
        });
    });
    $('#list li').bind('click', function () {
        var id = $(this).attr('data-id');
        tp.switchMusic(id);
    });
    $('#add-1').bind('click', function () {
        var item = {
            'song_id': 2112,
            "song_name": '一见钟情',
            'singer_name': '蓝心湄',
            'album_name': '2015江苏卫视新年演唱会',
            "duration": "05:00",
            "format": "m4a",
            "bitrate": 32,
            "type_description": "压缩品质",
            "url": "http://m5.file.xiami.com/1/759/1759/9711/120137_440256_l.mp3?auth_key=9adbe6957d03c87502d8d17fcfb1f41f-1457654400-0-null",
            "size": "1.18M",
            "type": 1
        };
        tp.addItem(item);
        $('#list li').bind('click', function () {
            var id = $(this).attr('data-id');
            tp.switchMusic(id);
        });
    });
    $('#add-2').bind('click', function () {
        var item = {
            'song_id': 32121,
            "song_name": '窗外',
            'singer_name': '李堔',
            'album_name': '2015江苏卫视新年演唱会',
            "duration": "05:00",
            "format": "mp3",
            "bitrate": 128,
            "type_description": "标准品质",
            "url": chuangwai,
            "size": "3.18M",
            "type": 1
        };
        tp.addItem(item);
        $('#list li').bind('click', function () {
            var id = $(this).attr('data-id');
            tp.switchMusic(id);
        });
    });
    $('#add-3').bind('click', function () {
        var item = {
            'song_id': 12312,
            "song_name": '采花郎',
            'singer_name': '刁寒',
            'album_name': '2015江苏卫视新年演唱会',
            "duration": "05:00",
            "format": "mp3",
            "bitrate": 128,
            "type_description": "标准品质",
            "url": caihualang,
            "size": "1.18M",
            "type": 1
        };
        tp.addItem(item);
        $('#list li').bind('click', function () {
            var id = $(this).attr('data-id');
            tp.switchMusic(id);
        });
    });
    $('#rem-1').click(function () {
        tp.removeItem(32121);
        $('#list li').bind('click', function () {
            var id = $(this).attr('data-id');
            tp.switchMusic(id);
        });
    });

});
