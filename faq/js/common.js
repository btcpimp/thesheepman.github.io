jQuery(document).ready(function($) {
    $('.question-list__item').click(function() {
        $(this).siblings('.question-list__item').removeClass('question-active')
        if ($(this).hasClass('question-active')) {
            return false
        } else {
            $(this).toggleClass('question-active');
            var index = $(this).index()
        }
        $('.answer-block__text').removeClass('answer-active')
        $('.answer-block__text').eq(index).addClass('answer-active')
    })

});