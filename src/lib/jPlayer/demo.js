$(document).ready(function () {

    window.myPlaylist = new jPlayerPlaylist({
        jPlayer: "#jplayer_N",
        cssSelectorAncestor: "#jp_container_N"
    }, [{
        title: "花间梦事",
        artist: "ADG3",
        id:"159568",
        mp3: "http://m2.music.126.net/4fEzGRFEKLplsm6QarBHxQ==/1228154488233466.mp3",
        poster: "images/m0.jpg"
    }], {
        playlistOptions: {
            enableRemoveControls: true,
            autoPlay: true
        },
        swfPath: "js/jPlayer",
        supplied: "webmv, ogv, m4v, oga, mp3",
        smoothPlayBar: true,
        keyEnabled: true,
        audioFullScreen: false
    });

    var item = {
        title: "花间梦事",
        artist: "ADG3",
        mp3: "http://m2.music.126.net/4fEzGRFEKLplsm6QarBHxQ==/1228154488233466.mp3",
        poster: "images/m0.jpg"
    };
    $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer, function () {
        $('.musicbar').removeClass('animate');
        $('.jp-play-me').removeClass('active');
        $('.jp-play-me').parent('li').removeClass('active');
    });

    $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer, function () {
        $('.musicbar').addClass('animate');
    });

    $(document).on('click', '.jp-play-me', function (e) {
        e && e.preventDefault();
        var $this = $(e.target);
        if (!$this.is('a')) $this = $this.closest('a');

        $('.jp-play-me').not($this).removeClass('active');
        $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

        $this.toggleClass('active');
        $this.parent('li').toggleClass('active');
        if (!$this.hasClass('active')) {
            myPlaylist.pause();
        } else {
            var i = Math.floor(Math.random() * (1 + 7 - 1));
            myPlaylist.play(i);
        }

    });
    //window.myPlaylist.playlist.push(item);
});
