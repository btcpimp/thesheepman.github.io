jQuery(document).ready(function($) {
    $('.print-btn').click(function() {
        window.print();
    });
    $('.modal-head li').click(function() {
        if ($('.head-text__item').length < 2) {
            var text = $(this).text()
            $('.default-head').hide()
            $('.head-text').append('<div class="head-text__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        } else {
            $('.head-text').text('')
            var text = $(this).text()
            $('.head-text').append('<div class="head-text__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        }

    });
    $('.modal-neck li').click(function() {
        var text = $(this).text()
        $('.neck-text').text(text)
        $('.modal').removeClass('active')
    });
    $('.modal-left-arm li').click(function() {
        if ($('.text-left-arm__item').length < 2) {
            var text = $(this).text()
            $('.default-left').hide()
            $('.text-left-arm').append('<div class="text-left-arm__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        } else {
            $('.text-left-arm').text('')
            var text = $(this).text()
            $('.text-left-arm').append('<div class="text-left-arm__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        }

    });
    $('.modal-body li').click(function() {
        if ($('.body-text__item').length < 4) {
            var text = $(this).text()
            $('.tees').hide()
            $('.body-text').append('<div class="body-text__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        } else {
            $('.body-text').text('')
            var text = $(this).text()
            $('.body-text').append('<div class="body-text__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        }

    });
    $('.modal-right-arm li').click(function() {
        if ($('.text-right-arm__item').length < 2) {
            var text = $(this).text()
            $('.default-right').hide()
            $('.text-right-arm').append('<div class="text-right-arm__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        } else {
            $('.text-right-arm').text('')
            var text = $(this).text()
            $('.text-right-arm').append('<div class="text-right-arm__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        }

    });
    $('.modal-left-foot li').click(function() {
        if ($('.text-left-foot__item').length < 2) {
            var text = $(this).text()
            $('.left-foot-default').hide()
            $('.text-left-foot').append('<div class="text-left-foot__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        } else {
            $('.text-left-foot').text('')
            var text = $(this).text()
            $('.text-left-foot').append('<div class="text-left-foot__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        }

    });
    $('.modal-right-foot li').click(function() {
        if ($('.text-right-foot__item').length < 2) {
            var text = $(this).text()
            $('.right-foot-default').hide()
            $('.text-right-foot').append('<div class="text-right-foot__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        } else {
            $('.text-right-foot').text('')
            var text = $(this).text()
            $('.text-right-foot').append('<div class="text-right-foot__item">' + text + '</div><br>')
            $('.modal').removeClass('active')
        }

    });
    $('.modal-foots li').click(function() {
        var text = $(this).text()
        $('.text-foots').text(text)
        $('.modal').removeClass('active')
    });
    $('.text').click(function() {
        if ($(this).hasClass('head-text')) {
            $('.modal').removeClass('active')
            $('.modal-head').toggleClass('active')
        } else if ($(this).hasClass('neck-text')) {
            $('.modal').removeClass('active')
            $('.modal-neck').toggleClass('active')

        } else if ($(this).hasClass('body-text')) {
            $('.modal').removeClass('active')
            $('.modal-body').toggleClass('active')

        } else if ($(this).hasClass('text-left-arm')) {
            $('.modal').removeClass('active')
            $('.modal-left-arm').toggleClass('active')

        } else if ($(this).hasClass('text-right-arm')) {
            $('.modal').removeClass('active')
            $('.modal-right-arm').toggleClass('active')

        } else if ($(this).hasClass('text-left-foot')) {
            $('.modal').removeClass('active')
            $('.modal-left-foot').toggleClass('active')

        } else if ($(this).hasClass('text-right-foot')) {
            $('.modal').removeClass('active')
            $('.modal-right-foot').toggleClass('active')

        } else if ($(this).hasClass('text-foots')) {
            $('.modal').removeClass('active')
            $('.modal-foots').toggleClass('active')

        }
    });
});