jQuery(document).ready(function($) {
    $("#scroll").click(function(e) {
        e.preventDefault;
        $('html, body').animate({
            scrollTop: $("#choose").offset().top
        }, 2000);
    });
});
