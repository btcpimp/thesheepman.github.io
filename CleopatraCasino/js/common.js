$(document).ready(function() {
    $('.top-nav__search').click(function(event) {
        $('.search-input').addClass('__search-visible')
        $(this).addClass('__search-active')
    });
    $('.search-input__close').click(function(event) {
        $('.search-input').removeClass('__search-visible')
        $('.top-nav__search').removeClass('__search-active')
    });
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: true
            },
            1000: {
                items: 4,
                nav: true,
            }
        }
    })
    $('.owl-nav').prependTo('.wrapper__winners')
    $('.owl-next').text('')
    $('.owl-next').append('<i class="fa fa-angle-right" aria-hidden="true"></i>')
    $('.owl-prev').text('')
    $('.owl-prev').append('<i class="fa fa-angle-left" aria-hidden="true"></i>')
    $('.show-more').click(function() {
        event.preventDefault();
        $('.block__preview ').removeClass('game-hidden')
    });
    $('.top-nav__mobile-button').click(function() {
        event.preventDefault();
        $('.mobile-nav').toggleClass('mobile-visible');
    });
    var selectedOption = $('#popular-select');

    var block__preview = $('.block__preview')
    selectedOption.on('change', function() {
        if (selectedOption.val() == 'Popular') {
            block__preview.not('.popular').addClass('game-hidden')
        } else {
            block__preview.removeClass('game-hidden')
        }
    })


});
