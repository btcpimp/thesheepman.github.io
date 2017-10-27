jQuery(document).ready(function($) {
	var burger = $('.header-mobile__button-burger')
	var menu = $('.menu')
	burger.click(function() {
		menu.toggleClass('active');
		$(this).toggleClass('menu-active');
	});
});