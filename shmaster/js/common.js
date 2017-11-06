jQuery(document).ready(function($) {
	var burger = $('.header-mobile__button-burger')
	var menu = $('.menu')
	burger.click(function() {
		menu.toggleClass('active');
		$(this).toggleClass('menu-active');
	});

	//products
	$('.procuts-item').click(function() {
		$('.modal').toggleClass('active');
		$('.products-item__title', this).toggleClass('active');
		$('.products-inner', this).toggleClass('active');
	});

	$('.modal').click(function() {
		if($(this).hasClass('active')){
			$(this).toggleClass('active');
			$('.products-inner').removeClass('active')
			$('.products-item__title').removeClass('active')

		}
	});
});