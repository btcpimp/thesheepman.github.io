$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
	nav: true,
	navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
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
});