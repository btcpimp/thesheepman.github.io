$(document).ready(function() {
  AOS.init();
    //MENU SCROLL
    $(".header-mnu__link").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top-80;
        $('body,html').animate({ scrollTop: top }, 400);
    });


    //Phone Validation
    $(".form__phone").mask("+375(99) 999-99-99", { autoclear: false });
    $('button').on('click', function() {
        var numberValuse = $(".form__phone").val()
        del = numberValuse[numberValuse.length - 1]
        del2 = numberValuse[numberValuse.length - 2]
        if (del === '_' && del2 === "_") {
            alert('Проверьте введенный вами номер!')
        };
        if ($("#name-input").val() == 0) {
            alert('Введите ваше имя!')
        }
    })
    //PHP Mail
    $(".header-form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
            $(".header__form").trigger("reset");
        });
        return false;
    });
    $(window).scroll(startCounter);

    function startCounter() {
        if ($(window).scrollTop() > 200) {
            $(window).off("scroll", startCounter);
            $('.Count').each(function() {
                var $this = $(this);
                jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                    duration: 5000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
        }
    }
    // Sticky Header
    // Mobile Navigation
    $('.mobile-toggle').click(function() {
        if ($('.main_h').hasClass('open-nav')) {
            $('.main_h').removeClass('open-nav');
        } else {
            $('.main_h').addClass('open-nav');
        }
    });

    $('.main_h li a').click(function() {
        if ($('.main_h').hasClass('open-nav')) {
            $('.navigation').removeClass('open-nav');
            $('.main_h').removeClass('open-nav');
        }
    });

    // navigation scroll lijepo radi materem
    $('nav a').click(function(event) {
        var id = $(this).attr("href");
        var offset = 70;
        var target = $(id).offset().top - offset;
        $('html, body').animate({
            scrollTop: target
        }, 500);
        event.preventDefault();
    });

    $('.price-button').click(function(event) {
        $('.price-button').removeClass('active')
        $(this).toggleClass('active');
        var currentModel = $(this).attr("data-model")
        $('.price-table__models').removeClass('active')
        var modelTab = $(".price-table__models").filter('[data-model="' + currentModel + '"]')
        modelTab.toggleClass('active');
    });

    $(".header-choose__item").on("click", function(event) {
        var currentModel = $(this).attr("data-model")
        var top = $('#price').offset().top;
        $('.price-table__models').removeClass('active')
        $('.price-button').removeClass('active')
        var modelTab = $(".price-table__models").filter('[data-model="' + currentModel + '"]')
        var modelButton = $(".price-button").filter('[data-model="' + currentModel + '"]')
        modelButton.toggleClass('active');
        modelTab.toggleClass('active');
        $('body,html').animate({ scrollTop: top }, 400);
    });
    $('.q-list__item').click(function(event) {
        $('.q-list__item').removeClass('active')
        var currentItem = $(this).index()
        $(this).addClass('active')
        $('.faq-a__item').removeClass('active')
        $('.faq-a__item').eq(currentItem).addClass('active')
    });
    $('.leftItems').click(function(event) {
        var currentItem = $(this).index()
        $('.leftDescr').removeClass('active')
        $('.leftDescr').eq(currentItem).addClass('active')
    });
    $('.rightItems').click(function(event) {
        var currentItem = $(this).index()
        $('.rightDescr').removeClass('active')
        $('.rightDescr').eq(currentItem).addClass('active')
    });
    $('.descr-item__close').click(function(event) {
       $('.descr-item').removeClass('active')
    });
    $('.burger').click(function(event) {
        $('.vert-mnu').toggleClass('vert-mnu_visible');
    });
    $('.vert-mnu-close').click(function(event) {
          $('.vert-mnu').toggleClass('vert-mnu_visible');
    });
});