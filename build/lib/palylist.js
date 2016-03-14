define(function (require, exports, module) {
    var $ = require('jquery');

    var tPlaylist = function () {

    };
    tPlaylist.prototype.readList = function () {
        try {
            var play_list = localStorage.getItem('play_list');
            if (play_list) {
                var list = JSON.parse(play_list).list;
                //加入播放列表
                list.map(function (i) {
                    var i = {
                        title: i.song_name,
                        artist: i.singer_name,
                        mp3: i.url,
                        poster: "images/m0.jpg"
                    };
                    window.myPlaylist.playlist.push(i);
                });
                return list;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
        }
    };
    tPlaylist.prototype.addItem = function (item) {
        try {
            var p_l = this.readList();
            if (p_l) {
                //检查是否之前已经添加过
                if (this.checkOverlap(p_l.list, item.song_id)) {
                    p_l.list.push(item);
                } else {
                    alert('已经添加过了');
                }

            } else {
                p_l = {
                    list: [item]
                };
            }
            this.readList();
            localStorage.setItem('play_list', JSON.stringify(p_l));
        } catch (e) {
            console.log(e);
        }
    };

    module.exports = tPlaylist;
});