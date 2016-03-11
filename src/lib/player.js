// 所有模块都通过 define 来定义
define(function (require, exports, module) {
    var $ = require('jq');

    var TPlayer = function (opt) {
        this.player = document.getElementById(opt.id);
        this.list = opt.list ? opt.list : this.readLocal('play_list').list;
        this.opt = opt;
        this.checkList();
        this.player.autoplay = true;
    };

    TPlayer.prototype = new Audio();
    //播放、暂停
    TPlayer.prototype.changePlay = function (callback) {
        if (this.player.paused) {
            this.player.play();
        } else {
            this.player.pause();
        }
        if (!!callback) {
            callback(this.player);
        }
    };
    //是否在播放？
    TPlayer.prototype.isPlaying = function () {
        if (this.player.paused) {
            return false;
        } else {
            return true;
        }
    };
    //切换音乐
    TPlayer.prototype.switchMusic = function (m_id) {
        var play_list = JSON.parse(localStorage.getItem('play_list')).list;
        play_list.map(function (item) {
            if (item.song_id == m_id) {
                this.player.src = item.url;
                $('#now').html('正在播放：' + item.song_name + '  歌手：' + item.singer_name);
                localStorage.setItem('current', JSON.stringify(item));
            }
        });
    };
    //检查播放列表
    TPlayer.prototype.checkList = function () {
        //1.读取列表，如果没有，则啥也不干
        var current = this.readLocal('current');
        var play_list = this.readLocal('play_list');
        if (play_list) {
            var list = play_list.list;
            this.showList(list);
        } else {

        }
        if (!!current) {

            this.player.src = current.url;
            $('#now').html('正在播放：' + current.song_name + '  歌手：' + current.singer_name);
        }

    };
    //添加播放列表
    TPlayer.prototype.addItem = function (item) {

        var p_l = this.readLocal('play_list');
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
        //重新渲染列表
        this.showList(p_l.list);
        localStorage.setItem('play_list', JSON.stringify(p_l));
    };
    //从播放列表移除
    TPlayer.prototype.removeItem = function (song_id) {
        var p_l = this.readLocal('play_list');
        if (p_l) {
            //检查列表中是否有该项目
            var new_list = [];
            p_l.list.map(function (item) {
                if (item.song_id !== song_id) {
                    new_list.push(item);
                }
            });
            //重新渲染列表
            this.showList(new_list);
            localStorage.setItem('play_list', JSON.stringify({
                list: new_list
            }));
        }

    };
    //读取存储
    TPlayer.prototype.readLocal = function (key) {
        try {
            var local = localStorage.getItem(key);
            if (!!local) {
                var obj = JSON.parse(local);
                return obj;
            } else {
                console.log('local', '没有在本地存储中找到' + key + '的值');
                return false;
            }

        } catch (e) {
            console.log(e);
        }
    };
    //list DOM操作
    TPlayer.prototype.showList = function (list) {
        $('#list').html('');
        list.map(function (item) {
            $('#list').append('<li data-id="' + item.song_id + '">' + item.song_name + '</li>');
        });
    };
    //检查重复
    TPlayer.prototype.checkOverlap = function (arr, song_id) {
            var isOverlap = true;
            if (arr && arr instanceof Array) {
                arr.map(function (i) {
                    if (i.song_id === song_id) {
                        isOverlap = false;
                    }
                });
            }
            return isOverlap;
        }
        //上一曲


    module.exports = TPlayer;
});
