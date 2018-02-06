jQuery(document).ready(function($) {
    var burger = $('.header-mobile__button-burger')
    var menu = $('.menu')
    burger.click(function() {
        menu.toggleClass('active');
        $(this).toggleClass('menu-active');
    });

    //products
    $('.procuts-item').click(function(event) {
        if ($(event.target).hasClass('products-router')) {
            return true
        } else {
            $('.modal').toggleClass('active');
            $('.products-item__title', this).toggleClass('active');
            $('.products-inner', this).toggleClass('active');
        }
    });

    $('.modal').click(function() {
        if ($(this).hasClass('active')) {
            $(this).toggleClass('active');
            $('.products-inner').removeClass('active')
            $('.products-item__title').removeClass('active')

        }
    });

    $('.products-preview-item__about').hover(function() {
        $(this).addClass('active')
    }, function() {
        $(this).removeClass('active')
    });

    //clients
    $('.map-block').hover(function(){
        $(this).children('.highlighted').addClass('active')
        $(this).children('.map--contact').addClass('active')
    }, function(){
            $(this).children('.highlighted').removeClass('active')
            $(this).children('.map--contact').removeClass('active')

        })
});