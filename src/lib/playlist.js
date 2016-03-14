define(function (require, exports, module) {
    var $ = require('jquery');

    var tPlaylist = function () {

    };
    tPlaylist.prototype.readList = function () {
        //try {
        var play_list = localStorage.getItem('play_list');
        if (play_list) {
            var list = JSON.parse(play_list).list;
            //加入播放列表
            list.map(function (i) {
                var item = {
                    id: i.song_id,
                    title: i.song_name,
                    artist: i.singer_name,
                    mp3: i.url,
                    poster: "images/m0.jpg"
                };
                window.myPlaylist.add(item);
            });
            return list;
        } else {
            return false;
        }
        /* } catch (e) {
             console.log(e);
         }*/
    };
    tPlaylist.prototype.getList = function () {
        var play_list = localStorage.getItem('play_list');
        if (play_list) {
            var list = JSON.parse(play_list).list;
            return list;
        } else {
            return false;
        }
    };
    tPlaylist.prototype.removeItem = function (song_id) {
        var p_l = this.getList('play_list');
        if (p_l) {
            //检查列表中是否有该项目
            var new_list = [];
            p_l.map(function (item) {
                if (item.song_id != song_id) {
                    new_list.push(item);
                }
            });
            //重新渲染列表
            localStorage.clear();
            localStorage.setItem('play_list', JSON.stringify({
                list: new_list
            }));
        }
    };
    tPlaylist.prototype.addItem = function (item) {
        //   try {
        var p_l = this.getList();
        if (p_l) {
            //检查是否之前已经添加过
            if (this.checkOverlap(p_l, item.song_id)) {
                p_l.push(item);

                var i = {
                    id: item.song_id,
                    title: item.song_name,
                    artist: item.singer_name,
                    mp3: item.url,
                    poster: "images/m0.jpg"
                };
                window.myPlaylist.add(i);
                //window.myPlaylist.playlist.push(i);
                // this.addDom(item.song_name, item.singer_name);
                localStorage.setItem('play_list', JSON.stringify({
                    list: p_l
                }));
            } else {
                alert('已经添加过了');
            }


        } else {
            var p = {
                list: [item]
            };
            var i = {
                id: item.song_id,
                title: item.song_name,
                artist: item.singer_name,
                mp3: item.url,
                poster: "images/m0.jpg"
            };
            //window.myPlaylist.playlist.push(i);
            //this.addDom(item.song_name, item.singer_name);
            window.myPlaylist.add(i);
            localStorage.setItem('play_list', JSON.stringify(p));
        }

        /*} catch (e) {
            console.log(e);
        }*/
    };
    tPlaylist.prototype.checkOverlap = function (arr, song_id) {
        var isOverlap = true;
        if (arr && arr instanceof Array) {
            arr.map(function (i) {
                if (i.song_id === song_id) {
                    isOverlap = false;
                }
            });
        }
        return isOverlap;
    };

    module.exports = tPlaylist;
});
