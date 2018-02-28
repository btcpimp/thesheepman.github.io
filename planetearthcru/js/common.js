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
		$('main').toggleClass('hidden');
	});
	 $(document).on("scroll", onScroll);
    
    function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.block-nav__list-item').each(function () {
        var currLink = $(this);
        var refElement = $($('a', this).attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.block-nav__list-item a').removeClass("block-nav-active");
            currLink.addClass("block-nav-active");
        }
        else{
            currLink.removeClass("block-nav-active");
        }
    });
}
});
