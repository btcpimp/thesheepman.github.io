jQuery(document).ready(function($) {
    $('.modal-head li').click(function() {
        var text = $(this).text()
        $('.head-text').text(text)
        $('.modal').removeClass('active')
    });

    $('.modal-neck li').click(function() {
        var text = $(this).text()
        $('.neck-text').text(text)
        $('.modal').removeClass('active')
    });
    $('.modal-left-arm li').click(function() {
        var text = $(this).text()
        $('.text-left-arm').text(text)
        $('.modal').removeClass('active')
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
        var text = $(this).text()
        $('.text-right-arm').text(text)
        $('.modal').removeClass('active')
    });
    $('.modal-left-foot li').click(function() {
        var text = $(this).text()
        $('.text-left-foot').text(text)
        $('.modal').removeClass('active')
    });
    $('.modal-right-foot li').click(function() {
        var text = $(this).text()
        $('.text-right-foot').text(text)
        $('.modal').removeClass('active')
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