$(function() {

    $('.form-popup').magnificPopup({
        items: [{
            src: '#consulting-form', // CSS selector of an element on page that should be used as a popup
            type: 'inline'
        }],
        gallery: {
            enabled: true
        },
        type: 'image' // this is default type
    });

    $('.mobile-toggle').click(function() {

        $('.mobile-nav').toggleClass('mobile-nav-active')
        $('.menu-open').toggleClass('close-hidden');
        $('.menu-close').toggleClass('close-hidden');
    });

    $('.main-slider').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        dots: false,
        nav: true,
        navText: ['<div class="slider__arrow-left"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="11px"> <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M5.239,0.163 C5.456,-0.057 5.819,-0.057 6.044,0.163 C6.262,0.376 6.262,0.729 6.044,0.941 L1.960,4.928 L15.435,4.928 C15.749,4.929 15.999,5.172 15.999,5.479 C15.999,5.786 15.749,6.037 15.435,6.037 L1.960,6.037 L6.044,10.016 C6.262,10.237 6.262,10.591 6.044,10.802 C5.819,11.022 5.456,11.022 5.239,10.802 L0.188,5.872 C-0.037,5.660 -0.037,5.306 0.188,5.094 L5.239,0.163 Z"/> </svg></div > ', '<div class="slider__arrow-right"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="12px"> <path fill-rule="evenodd" fill="rgb(255, 255, 255)" d="M10.760,0.163 C10.543,-0.057 10.180,-0.057 9.955,0.163 C9.737,0.377 9.737,0.732 9.955,0.944 L14.038,4.942 L0.563,4.942 C0.249,4.942 -0.000,5.187 -0.000,5.494 C-0.000,5.802 0.249,6.054 0.563,6.054 L14.038,6.054 L9.955,10.045 C9.737,10.265 9.737,10.620 9.955,10.833 C10.180,11.054 10.543,11.054 10.760,10.833 L15.810,5.889 C16.036,5.676 16.036,5.321 15.810,5.109 L10.760,0.163 Z"/> </svg></div>'],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: true
            },
            1000: {
                items: 1,
                nav: true,
                loop: true
            }
        }
    })
    $('#clients__slider-planning').owlCarousel({
        loop: false,
        margin: 10,
        responsiveClass: true,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1,
            },
            1200: {
                items: 3,
            },
            1000: {
                items: 2,
                loop: true,
                dots: true
            }
        }
    })
    $('.clients__slider').owlCarousel({
        loop: false,
        margin: 10,
        responsiveClass: true,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1,
            },
            1200: {
                items: 4,
            },
            1000: {
                items: 3,
                loop: true,
                dots: true
            }
        }
    })
    $('ul.tabs__caption').on('click', 'li:not(.tab-active)', function() {
        $(this)
            .addClass('tab-active').siblings().removeClass('tab-active')
            .closest('div.tabs').find('div.tabs__content').removeClass('tab-active').eq($(this).index()).addClass('tab-active');
    });
    $('.location__region').on('click', 'li:not(.region-active)', function() {
        $(this)
            .addClass('region-active').siblings().removeClass('region-active')
            .closest('div.inner__location').find('div.inner__contacts').find('div.contacts__tab').removeClass('region-active').eq($(this).index()).addClass('region-active');
    });
    $('.region__choose a').click(function(event) {
        event.preventDefault();
    })
    $('.clients__slider__block').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.'
        }
    });
    $("#consulting-form").submit(function() {
        $(this).addClass('mfp-hide')
        alert('Благодарим! Данные приняты, наш менеджер свяжется с вами в самое ближайшее время')
    });
    $('.page__gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title');
            }
        }
    });
    $('.side-nav__mobile').click(function(){
        $('.side-nav__mobile img').toggleClass('arrow-hidden');
        $('.page__side-nav').toggleClass('side-nav__display')
        })
        $('.solutions-item__heading').click(function(){
        $('img', this).toggleClass('arrow-hidden'); 
        $(this).siblings('.items__list').toggleClass('items__list-display');
        })
    $('.arrow-toggle').click(function() {
        event.preventDefault();
    });
});