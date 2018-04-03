$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        loop: true
    })

    $('.fullpack').click(function(event) {
        $(this).toggleClass('active')
        $(this).siblings('.full-text').toggleClass('active');
    });

    $('.open-btn').click(function(event) {
        $('.mobile-menu').addClass('active')
    });
    $('.close-btn').click(function(event) {
        $('.mobile-menu').removeClass('active')
    });
    $('.callback').click(function() {
        $('.modal').addClass('active')
        $('body').addClass('noscroll')
        $('.modal-form__button').click(function(event) {
            $('.modal').removeClass('active')
            $('body').removeClass('noscroll')
        });
        $('.modal').click(function(event) {
        	console.log(event.target.className)
        	if(event.target.className =='modal active'){
        		$('.modal').removeClass('active')
                $('body').removeClass('noscroll')
        	}

        });

    })

     $("#form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
            $("#form").trigger("reset");
        });
        return false;
    });

     //Phone Validation
    $("#phone-input").mask("+375(99) 999-99-99", { autoclear: false });
    $('.modal-form__button').on('click', function() {
            var numberValuse = $("#phone-input").val()
            del = numberValuse[numberValuse.length - 1]
            del2 = numberValuse[numberValuse.length - 2]
            if (del === '_' && del2 === "_") {
                alert('Проверьте введенный вами номер!')
            };
            if ($("#name-input").val() == 0) {
                alert('Введите ваше имя!')
            }
        })
});