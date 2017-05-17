var vkData = []
var audio1 = []
var audios = []
var current_list1 = []
var audioVolume = 0.5

function Nam1() {
    var ourtrack = $('.search_form').val();
    var str = 'https://api.vk.com/method/audio.search?q=' + ourtrack + '&access_token=88326921603ddaad7e22a9d637224602f7276197718eb55b2d81e3702ada8e5de3b293c3f5491317fe3fe&v=5.57';
    $.ajax({
        method: "get",
        url: str,
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
            vkData = data
            $('.search_tracklist_block').fadeIn();
            $('.play_block').fadeIn();
            $('.playlist').fadeIn();
            $('.daily_track_block ').fadeIn()
            $('.search_track_result').text('Search Result for ' + '"' + ourtrack + '"')
            $('.track_found').remove();
            start();
            $('.download_track').on("click", function(e) {
                downloadTrack(e.target);
            })
            $('.add_track').on("click", function(e) {
                addPlayer(e.target);
                addPlayerList(e.target);
            })
        },

        error: function(data) {
            alert('!!!error!!!');

        }
    });
}

$("#submit_search").on("click", Nam1)

$('header').keypress(function(e) {
    if (e.which == 13) {
        Nam1();
        return false;
    }
});

function startPlayer() {
    var a = audiojs.createAll({
        trackEnded: function() {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            $('.current_track').text($('.newList', next).text())
            audio1.load($('a', next).attr('src'));
            audio1.play();
        }
    });
    audio1 = a[0]
}

function downloadTrack(el) {
    var g = $(el).data('index');
    $('.dow').attr({
        href: vkData.response.items[g].url
    });

}

function addPlayer(el) {
    var qwe = "<audio preload class='player'/><div id='master'></div>"
    $('.player_container').empty();
    $('.player_container').append(qwe)
    sliderCustumize();
    var i = $(el).data('index');
    startPlayer();
    $('.player').attr({
        src: vkData.response.items[i].url
    });
    var current_track = vkData.response.items[i].artist + " " + vkData.response.items[i].title
    $('.current_track').text(current_track)
    audios = document.getElementsByClassName('player');
}

function addPlayerList(el) {
    var addList = "<li><a href='#' class = 'newList'></a></li>"
    $('ol').append(addList)
    var c = $(el).data('index');
    var current_list = vkData.response.items[c].artist + " " + vkData.response.items[c].title
    current_list1 = current_list
    var t = vkData.response.items[c].url
    $('.newList').last().text(current_list)
    $('.newList').last().attr({
        src: t
    });
    $('ol li').click(function(e) {
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        $('.current_track').text($('.newList', this).text())
        audio1.load($('.newList', this).attr('src'));
        audio1.play();
    });
    $('.delete').on("click", function() {
        $('ol').empty();
    })
}

function start() {
    for (var i = 0; i < vkData.response.items.length && i < 5; i++) {
        var artist = vkData.response.items[i].artist
        var title = vkData.response.items[i].title
        var track_url = vkData.response.items[i].url
        var strdiv = "<div class = 'track_found' >" + artist + " – " + title + "<button class='add_track" + "' ><i class='fa fa-plus' data-index='" + i + "' aria-hidden='true'></i></button><button class='download_track'><a class='dow' download='track'><i class='fa fa-arrow-circle-o-down' data-index='" + i + "'aria-hidden='true'></i></a></button><br></div>";
        $(".search_tracklist").append(strdiv);
    };
}

function sliderCustumize() {
    $("#master").slider({
        value: 60,
        orientation: "horizontal",
        range: "min",
        animate: true,
        slide: function(event, ui) {
            audios[0].volume = ui.value / 100
        }
    })
}

$(function() {
    $("ol").sortable();
    $("ol").disableSelection();
});
