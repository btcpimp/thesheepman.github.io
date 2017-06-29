$(document).ready(function() {
    $('#login').on('click', function(e) {
        e.preventDefault();
        $('.modal').addClass('modal-open')
    })
    $('.modal').click(function() {
        $('.modal').removeClass('modal-open')
    });

    $('.form').click(function(event) {
        event.stopPropagation();
    });
    $('.close').click(function(){
    	$('.modal').removeClass('modal-open')
    })
    $(function() {
        var availableTags = [
            "Minsk, Belarus",
            "San-Francisco, USA"
        ];
        $("#tags").autocomplete({
            source: availableTags
        });
    });
});
