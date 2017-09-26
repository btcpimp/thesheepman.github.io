Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
};
//
// (function(d, w, m) {
//     window.supportAPIMethod = m;
//     var s = d.createElement('script');
//     s.type ='text/javascript'; s.id = 'supportScript'; s.charset = 'utf-8';
//     s.async = true;
//     var id = '9f5fa758620e2e94506cc38f0877cfd3';
//     s.src = '//admin.verbox.ru/support/support.js?h='+id;
//     var sc = d.getElementsByTagName('script')[0];
//     w[m] = w[m] || function() { (w[m].q = w[m].q || []).push(arguments); };
//     if (sc) sc.parentNode.insertBefore(s, sc);
//     else d.documentElement.firstChild.appendChild(s);
// })(document, window, 'Verbox');


document.addEventListener("DOMContentLoaded", function() {
	(function(){
		var mainHeader = document.querySelector('.cd-auto-hide-header'),
			headerHeight = mainHeader.offsetHeight;

		var scrolling = false,
			previousTop = 0,
			currentTop = 0,
			scrollDelta = 5,
			scrollOffset = 100;

		$(window).on('scroll', function(){
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame)
					? setTimeout(autoHideHeader, 250)
					: requestAnimationFrame(autoHideHeader);
			}
		});


		function autoHideHeader() {
			var currentTop = $(document).scrollTop();
			checkSimpleNavigation(currentTop);
			previousTop = currentTop;
			scrolling = false;
		}

		// function checkSimpleNavigationMobile(currentTop) {
		// 		if (previousTop - currentTop > scrollDelta) {
		// 			mainHeader.removeClass('is-hidden');
		// 		} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
		// 			mainHeader.addClass('is-hidden');
		// 		}
		// }
		function checkSimpleNavigation(currentTop) {
			if (currentTop <= 100) {
				mainHeader.classList.remove('is-hidden');
			} else {
				mainHeader.classList.add('is-hidden');
			}
		}
	})();
	function drag() {
		$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	}drag();
	function SlideLine() {

		var $el, leftPos, newWidth,
			$mainNav = $(".header-menu-list"),
			trigger = $mainNav.find('li a'),
			active = $mainNav.find('.active');

		$mainNav.append("<div id='slide-line'></div>");
		var $Line = $("#slide-line");

		function ActivePos(){
			 $Line.width($(active).find('span').width())
					.css("left", $(active).find('span').position().left)
					.data("origLeft", $Line.position().left)
					.data("origWidth", $Line.width());
		 }ActivePos();


		trigger.hover(function() {
			var $el = $(this).find('span');
			var leftPos = $el.position().left;
			var newWidth = $el.width();
			$Line.stop().animate({
				left: leftPos,
				width: newWidth
			});
		}, function() {
			$Line.stop().animate({
			  left: $Line.data("origLeft"),
			  width: $Line.data("origWidth")
			});
		});
		$(window).on('resize', function(){
			setTimeout(function(){
				ActivePos();
			},300);
		});
	}SlideLine();
	function Menu() {
		var trigger = $('.js-menu'),
			target = $('.header-menu-mobile');
		body = $('html'),
					OpenClass = 'open';
		trigger.add(target).on('click', function(e){
			e.preventDefault();
			if(!trigger.hasClass('anim')){
				trigger.addClass('anim');
				trigger.add(target).toggleClass(OpenClass);
				body.toggleClass('modal_open');
				setTimeout(function(){
					trigger.removeClass('anim')
				},600);
			}
		});
		$(window).on('resize', function(){
			if(trigger.hasClass(OpenClass)){
				setTimeout(function(){
					window.matchMedia("(min-width: 991px)").matches ? body.removeClass('modal_open') : false
				},300);
			}
		});
		$('.header-menu-mobile-inner').click(function(e){
			  e.stopPropagation();
		});
	}Menu();
	$(".js-scroll-to").on('click touchend', function (e) {
		var elementClick = $(this).attr("href");
		if($(elementClick)){
			var destination = $(elementClick).offset().top;
			$("html:not(:animated), body:not(:animated), .out:not(:animated)").animate({scrollTop: destination - 90}, 500);
		}else{
			e.preventDefault();
		}

	});
	validateForms();
	initCustomSelectList();
	DropzoneDile();
	filecheck();
	popUpsInit();
//end of document.ready
});
//end of document.ready
function validateForms(){
	var form_form = $('.js-validate');
	if (form_form.length) {
		form_form.each(function () {
			var form_this = $(this);
			$.validate({
				form : form_this,
				modules : 'security',
				borderColorOnError : true,
				scrollToTopOnError : false,
				onValidate : function($form) {
					CheckForSelect(form_this);
					//CheckForFile(form_this);
				}
			});
		});
	}
}
function CheckForSelect(form){
	if(form.find('.select-check').length){
		var wrap = form.find('.select-check');

		wrap.each(function(){
			var _ = $(this),
				btn = _.find('.selects'),
				option = _.find('.option.has-error');
			if(option.length){
				_.addClass('error');

			}else{
				_.removeClass('error');
			}
		});
		wrap.hasClass('error') ? false : true
	}
	// if(form.find('.js-file-block').length){
	// 	var check = form.find('.js-file-block');
	// 	check.each(function(){
	// 			var _ = $(this);
	// 			var inp =  _.find('input:checked').length;
	// 			var fil = _.find('.dz-file.dz-started').length;
	// 			inp === 1 && fil === 0 ? _.addClass('error') : _.removeClass('error');
	// 	});
	// 	check.hasClass('error') ? false : true
	// }
}
function CheckForFile(form){
	if(form.find('.js-file-block').length){
		var check = form.find('.js-file-block');
		check.each(function(){
			var _ = $(this);
			var inp = _.find('input:checked').length;
			var fil = _.find('.dz-file.dz-started').length;
			inp === 1 && fil === 0 ? _.addClass('error') : _.removeClass('error');
		});
		check.hasClass('error') ? false : true
	}
}
function initCustomSelectList() {
  /*$('input').keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });*/
	var _conf = {
			initClass: 'cs-active',
			f: {}
		},
		_items = $('.js-select-custom').not('.' + _conf.initClass);

	$.each(_items, function () {
		var _select = $(this),
			_button = _select.find('button'),
			placeholder = _button.data('placeholder'),
			_list = _select.find('.select-list');

		_select.on('reinit', function() {
			var _active = _list.find('input:checked');
			CheckForSelect($(this).parents('form'));
			if(_active.length) {
				_button.children('.btn-text').text('' + _active.siblings('span').text()+ '').parent().addClass('is-checked');
			}
			else {
				_button.children('.btn-text').text(_button.data('placeholder')).parent().removeClass('is-checked');
			}
		});

		_button.on('click', function() {
			_button.parent().toggleClass('active').siblings().removeClass('active');
			return(false);
		});

		_select.on('click', 'label', function() {
					 var _label = $(this),
						 _input = _label.find('input');

			_input.prop('checked', true).trigger('change');
			_select.trigger('reinit');
			_button.parent().removeClass('active');
		});
		_select.trigger('reinit');
		_select.addClass(_conf.initClass);

		$(document).on('mouseup', function (e){
			if (!_select.is(e.target)
					&& _select.has(e.target).length === 0) {
				_select.removeClass('active');
			}
		});
	});
}

function mapinit(elem){
	var cords = $("#"+elem).data('cords');
	var myMap;
	ymaps.ready(init);

	function init () {

		myMap = new ymaps.Map(elem, {
			center: cords,
			zoom: 16,
			controls: ['zoomControl', 'fullscreenControl']
		}, {

		}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
			}, {
				iconLayout: 'default#image',
				iconImageHref: '../images/myIcon.gif',
				iconImageHref: '../img/pin.png',
			// Размеры метки.
				iconImageSize:[292, 101],
				iconImageOffset: [-40, -81]
			});
		myMap.geoObjects.add(myPlacemark);
		myMap.behaviors.disable(['rightMouseButtonMagnifier','ruler','scrollZoom']);
		myMap.controls.remove('typeSelector');
		myMap.controls.remove('searchControl');
		myMap.controls.remove('GeolocationControl');
	}
}
function DropzoneDile(){
	$(".dz-file").each(function(){
		$(this).dropzone({
			url: "/files.php",
			previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div>',
			dictFileTooBig : 'Файл слишком большой',
			dictResponseError : 'Сервер ответил с ошибкой',
			dictInvalidFileType: 'Неверный тип файла',
			maxFilesize: '2',
			acceptedFiles: ".doc,.docx,.pdf,.txt",
			autoDiscover:false,
			maxFiles: 1,
			addRemoveLinks :true,
		});
	});
}
function filecheck(){
	if($('.form-block-file').length){
		var parent = $('.form-block-file');
		parent.each(function(){
			var _ = $(this),
				trigger = _.find('.select-u-item'),
				target = _.find('.dz-file');

			trigger.on('click', function(){
				_.trigger('reinit');
			});
			_.on('reinit', function(){
				var checked = trigger.find('input:checked');
				checked.length === 0 ? target.hide() : target.show();
			});
		});
		parent.trigger('reinit');
	}
}
function popUpsInit() {
	var _this = this;
	_this.b = {open: $('.js-popup-button')};
	_this.c = {
		popup: $('.js-popup-container'),
		body: $('body')
	};
	_this.f = {};
	_this.conf = {
		body_class: 'modal_open',
		active_class: 'active',
		close_selector: '.closePopup',
		initial_class: 'popup-initialed'
	};
	_this.f.initModalActions = function (_popup) {
		/**
		 * Close buttons.
		 */
		$(".modal-layout .modal-container").click(function(e) {
			e.stopPropagation();
		});
		// video = _popup.find('iframe').attr("src");
		_popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup', function () {
			_this.f.closePopup(_popup);
		});
	};
	_this.f.closePopup = function (_popup) {
		_popup.removeClass(_this.conf.active_class);
		_this.c.body.removeClass(_this.conf.body_class);
		_popup.find('iframe').attr("src",'');
	};
	_this.f.openPopup = function (_popup) {
		_popup.addClass(_this.conf.active_class);
		_this.c.body.addClass(_this.conf.body_class);
		var src = _popup.find('iframe').data('src');
		_popup.find('iframe').attr("src",src);
	};
	/**
	 * Initial.
	 */
	$.each(_this.c.popup.not('.' + _this.conf.initial_class), function () {
		var _popup = $(this);
		_this.f.initModalActions(_popup);
		_popup.off('reinit').on('reinit', function() {
			_this.f.initModalActions(_popup);
		});
		_popup.addClass(_this.conf.initial_class);
	});
	_this.b.open.off('click.popup').on('click.popup', function () {
		var _b = $(this),
			_popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');
		_this.f.openPopup(_popup);
		return false;
	});
}
$(document).ready(function(){
	$('.video-watcher').click(function(){
        let newObject = {value: 1, timestamp: new Date().addHours(168 * 4).getTime()};
        localStorage.setItem("postavkiby", JSON.stringify(newObject));
	});
    $('.modal-form button[type="submit"]').click(function() {

        let name = $('.modal-form input[name="name"]').val();

        if (name.length < 1) {
            $('.modal-form input[name="name"]').addClass('error');
		} else {
            $('.modal-form input[name="name"]').removeClass('error')
		}

        let email = $('.modal-form input[name="email"]').val();

       /* if (!isEmail(email)) {
            $('.modal-form input[name="email"]').addClass('error');
        } else {
            $('.modal-form input[name="email"]').removeClass('error')
        }*/

        let phone = $('.modal-form input[name="phone"]').val();

        if (phone.length < 1) {
            $('.modal-form input[name="phone"]').addClass('error');
        } else {
            $('.modal-form input[name="phone"]').removeClass('error')
        }

        let message = $('.modal-form textarea[name="message"]').val();

        if (name && phone) {
			if (!email) { email = 'none@postavki.by';}
            $.ajax({
                type: 'POST',
                url: $(".modal-form").attr('action'),
                data: 'web-form-submit=' + 1 + '&name=' + name + '&email=' + email + '&message=' + message + '&phone=' + phone,
                success: function() {
                	$('.modal-container-form').fadeOut(function(){

                        $('.success-message').fadeIn(1500, function(){
                            setTimeout(function(){
                                $('.success-message').fadeOut(500);
                                $('.hamburger.open').trigger('click');

                                setTimeout(function(){
                                    $('.modal-container-form input').val('');
                                    $('.modal-container-form textarea').val('');
                                    $('.modal-container-form').show();
                                }, 3500)
                            }, 15000);
                        });

					});

               }
            });
        } else {

		}

        return false;
    });

    
	$('.contact-form .success').hide();
	$(".contact-form").submit(function(){ // пeрeхвaтывaeм всe при сoбытии oтпрaвки
		
		var form = $(this); // зaпишeм фoрму, чтoбы пoтoм нe былo прoблeм с this
		var error = false; // прeдвaритeльнo oшибoк нeт
		form.find('input, textarea').each( function(){ // прoбeжим пo кaждoму пoлю в фoрмe
			if ($(this).val() == '') { // eсли нaхoдим пустoe
				alert('Зaпoлнитe пoлe "'+$(this).attr('placeholder')+'"!'); // гoвoрим зaпoлняй!
				error = true; // oшибкa
			}
		});
		if (!error) { // eсли oшибки нeт
			var data = form.serialize(); // пoдгoтaвливaeм дaнныe
			$.ajax({ // инициaлизируeм ajax зaпрoс
			   type: 'POST', // oтпрaвляeм в POST фoрмaтe, мoжнo GET
			   url: '/contact-ajax.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe
			   dataType: 'json', // oтвeт ждeм в json фoрмaтe
			   data: data, // дaнныe для oтпрaвки
		       beforeSend: function(data) { // сoбытиe дo oтпрaвки
		            form.find('.contact-form button[type="submit"]').attr('disabled', 'disabled'); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
		          },
		       success: function(data){ // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
				   
				   $('.contact-form .success').hide();                       
		       		if (data['error']) { // eсли oбрaбoтчик вeрнул oшибку
						console.log("success error");
		       			alert(data['error']); // пoкaжeм eё тeкст
		       			 //$('#fastorder .error').show();
		       		} else { // eсли всe прoшлo oк
		       			alert('Ваша заявка принята. Мы перезвоним Вам в ближайшее время.'); // пишeм чтo всe oк
		       			$('.contact-form .inputs').hide();
		       			$('.contact-form .success').show();  
		       		}
		         },
		       error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
		            alert(xhr.status); // пoкaжeм oтвeт сeрвeрa
		            alert(thrownError); // и тeкст oшибки
		         },
		       complete: function(data) { // сoбытиe пoслe любoгo исхoдa
					console.log("complete");
		            form.find('.contact-form button[type="submit"]').prop('disabled', false); // в любoм случae включим кнoпку oбрaтнo
		         }
		                  
			     });
		}
		return false; // вырубaeм стaндaртную oтпрaвку фoрмы
	});
	 
    $('.contact-form button[type="submit"]').click(function() {

        let name = $('.contact-form input[name="name"]').val();

        if (name.length < 1) {
            $('.contact-form input[name="name"]').addClass('error');
        } else {
            $('.contact-form input[name="name"]').removeClass('error')
        }

        let email = $('.contact-form input[name="email"]').val();

        if (!isEmail(email)) {
            $('.contact-form input[name="email"]').addClass('error');
        } else {
            $('.contact-form input[name="email"]').removeClass('error')
        }

        let phone = $('.contact-form input[name="phone"]').val();

        if (phone.length < 1) {
            $('.contact-form input[name="phone"]').addClass('error');
        } else {
            $('.contact-form input[name="phone"]').removeClass('error')
        }

        let message = $('.modal-form textarea[name="message"]').val();

        if (name && email && phone) {
            $.ajax({
                type: 'POST',
                url: $(".modal-form").attr('action'),
                data: 'web-form-submit=' + 1 + '&name=' + name + '&email=' + email + '&message=' + message + '&phone=' + phone,
                success: function() {
                	$('#init-success').trigger('click');
                    $('.modal-container-form').fadeOut(function(){
                        $('.success-message').fadeIn(1500, function(){
                            setTimeout(function(){
                                $('.success-message').fadeOut(500);
                                $('.hamburger.open').trigger('click');
                            }, 15000);
						});

                        setTimeout(function(){
                            $('.contact-form input').val('');
                            $('.contact-form textarea').val('');
                        }, 1500)
                    });

                }
            });
        } else {

        }

        return false;
    });

    $('.price-form .select-list .option').click(function(){
    	$('.price-form input[name="condition-field"]').val($(this).children('input').val());
	});

    $('.price-form .select-radio .input_label').click(function(){
    	$('.price-form input[name="service-field"]').val($(this).find('input').val());
	});

    $('.price-form .select-u-item .input-real').click(function(){
		
    	item = $(this);
		var checkBoxes = $('.price-form input[name="transport-field-' + item.val() + '"]');
		var oldValue  = checkBoxes.val();
		if( oldValue > 0 ) { checkBoxes.val(""); } else { checkBoxes.val(item.val()); }

	});

    $('.price-form button[type="submit"]').click(function(/*e*/) {
		// e.preventDefault();
        let name = $('.price-form input[name="name"]').val();

       /* if (name.length < 1) {
            $('.price-form input[name="name"]').addClass('error');
        } else {
            $('.price-form input[name="name"]').removeClass('error')
        }*/

        let email = $('.price-form input[name="email"]').val();
        let company = $('.price-form input[name="company"]').val();
        let skype = $('.price-form input[name="skype"]').val();
        let phone = $('.price-form input[name="phone"]').val();

        if(/*skype.length < 1 &&*/ phone.length > 1 || isEmail(email) ){
			
		}
			else
        {
			//$('.price-form input[name="phone"]').removeClass('error');
			//$('.price-form input[name="skype"]').removeClass('error');
		//	$('.price-form input[name="email"]').removeClass('error')
			
        if (!isEmail(email)) {
            $('.price-form input[name="email"]').addClass('error');
        } else {
            $('.price-form input[name="email"]').removeClass('error')
        }        

        if (phone.length < 1) {
            $('.price-form input[name="phone"]').addClass('error');
        } else {
            $('.price-form input[name="phone"]').removeClass('error')
        }
       /* if (skype.length < 1) {
            $('.price-form input[name="skype"]').addClass('error');
        } else {
            $('.price-form input[name="skype"]').removeClass('error')
        }*/
	//} else {
		//	$('.price-form input[name="phone"]').removeClass('error');
		//	$('.price-form input[name="skype"]').removeClass('error');
		//	$('.price-form input[name="email"]').removeClass('error')
		}


        let items = $('.price-form input[name="items"]').val();

       /* if (items.length < 1) {
            $('.price-form input[name="items"]').addClass('error');
        } else {
            $('.price-form input[name="items"]').removeClass('error')
        }*/

        let volume = $('.price-form input[name="volume"]').val();

        let dopinfo = $('.price-form input[name="dopinfo"]').val();

        let weight = $('.price-form input[name="weight"]').val();

        let condition = $('.price-form input[name="condition-field"]').val();

        let service = $('.price-form input[name="service-field"]').val();

       /* if (service.length < 1) {
            $('.price-form .service-title').addClass('error');
        } else {
            $('.price-form .service-title').removeClass('error')
        }*/
        
		transport = 'не выбрано';
        let transport1 = $('.price-form input[name="transport-field-1"]').val();
        let transport2 = $('.price-form input[name="transport-field-2"]').val();
        let transport3 = $('.price-form input[name="transport-field-3"]').val();
        if (transport1.length < 1 && transport2.length < 1 && transport3.length < 1) {
            //$('.price-form .transport-title').addClass('error');
        } else {
            //$('.price-form .transport-title').removeClass('error');
            transport = '';
            if ( transport1 == 1 ) { transport +=  " Авиа "; }
            if ( transport2 == 2 ) { transport +=  " Море "; }
            if ( transport3 == 3 ) { transport +=  " ЖД "; }
        }
        
		if (service == 1) {service = 'Поставка под ключ';}
		else if (service == 2) {service = 'Грузоперевозка';}
		else {service ='не выбрано';}
		
		
		//console.log('web-form-submit=' + 1 + '&name=' + name + '&email=' + email +'&company=' + company + '&skype=' + skype + '&service=' + service + '&transport=' + transport + '&phone=' + phone + '&items=' +  items +'&volume=' + volume +'&weight=' + weight +'&dopinfo=' + dopinfo + '&condition=' + condition);
        if (email || phone) {
		if (!email) { email = 'none@postavki.by';}
		if (!phone) { phone = 'не указан';}
            $.ajax({
                type: 'POST',
                url: '/price-ajax.php', // путь дo oбрaбoтчикa, у нaс oн лeжит в тoй жe пaпкe company volume weight condition
                data: 'web-form-submit=' + 1 + '&name=' + name + '&email=' + email +'&company=' + company + '&skype=' + skype + '&service=' + service + '&transport=' + transport + '&phone=' + phone + '&items=' +  items +'&volume=' + volume +'&weight=' + weight +'&dopinfo=' + dopinfo + '&condition=' + condition ,
				error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
		            alert(xhr.status); // пoкaжeм oтвeт сeрвeрa
		            alert(thrownError); // и тeкст oшибки
		         },
		        success: function() {
					$("#success-message").addClass("active");
					$('.price-form').trigger( 'reset' );
                	/*$('.modal-container').fadeIn(2000,function() { 
                        $('.success-message').fadeIn(1500, function(){
                            setTimeout(function(){
                                $('.success-message').fadeOut(500);
                                console.log("success");
                            }, 15000);
                        });
					
					});*/
					setTimeout(function(){
                                console.log("success");
                                $("#success-message").removeClass("active");
                            }, 10000);
					
                }/*,
				complete: function(data) { // сoбытиe пoслe любoгo исхoдa
					
					alert("Ваш запрос успешно отправлен, мы скоро свяжемся с Вами!"); // пoкaжeм oтвeт сeрвeрa
		         }*/
            });
        } else {
			return false;console.log('web-form-submit=' + 1 + '&name=' + name + '&email=' + email  + '&phone=' + phone);
        }

        return false;
    });
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
