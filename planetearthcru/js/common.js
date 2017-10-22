jQuery(document).ready(function($) {
	$('.language-choose').click(function() {
		if($(this).not('.language-active')){
			$('.language-choose').removeClass('language-active')
			$(this).addClass('language-active')
		}
		else{
			return false;
		}
	});
	$('.menu__burger').click(function() {
		$(this).toggleClass('menu-active');
		$('.nav').toggleClass('nav-active');
	});
});