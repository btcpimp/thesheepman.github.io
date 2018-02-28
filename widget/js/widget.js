var jq = document.createElement("script");

jq.addEventListener("load", proceed);
jq.src = "https://code.jquery.com/jquery-3.2.1.min.js";
document.querySelector("head").appendChild(jq);

function proceed() {


    $(document).ready(function() {

        //Window Params
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var mainSize = 0
        var widgetHeightClosed = 0;
        var widgetHeightOpen = 0;
        var widgetWidth = 0;
        var widgetRadius = 0;

        function windowSize() {
            if (windowWidth > 480) {
                if (windowWidth > windowHeight) {
                    mainSize = windowWidth
                } else {
                    mainSize = windowHeight
                }
                widgetWidth = mainSize / 6;
                widgetHeightOpen = widgetWidth * 1.5;
                widgetHeightClosed = widgetWidth * 0.2;
            } else {
                if (windowWidth > windowHeight) {
                    mainSize = windowHeight
                } else {
                    mainSize = windowWidth
                }
                $('.widget').addClass('widget-mobile')
                $('.widget').addClass('scale--animate')
                widgetWidth = windowWidth;
                widgetHeightClosed = widgetWidth
            }
            widgetRadius = mainSize / 6;
        }

        console.log(widgetHeightClosed)
        //template
        var widget = [
            "<div class='widget'>",
            "<div class='widget-nav'><a href='#' class='control_prev arrow-left hidden-left'><</a>",
            "<div class='widget-title'>Widget</div>",
            " <a href='#' class='control_next arrow-right hidden-right'>></a>",
            "</div>",
            "<div class='slider-wrapper hidden'>",
            "  <ul class='widget-slider'>",
            "    <li style='background:#F03434'>Slide 1</li>",
            "    <li style='background:#AEA8D3'>Slide 2</li>",
            "    <li style='background:#87D37C'>Slide 3</li>",
            "  </ul>",
            "</div>",
            "</div>"
        ]
        $('body').append(widget.join("\n"))
        windowSize();
        //css
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.widget {z-index:100;overflow:hidden;position:fixed;transition:height .3s;right:10px;bottom:20px;cursor:pointer;width:' + widgetWidth + 'px; background:#0e8ad4; height:' + widgetHeightClosed + 'px;}\
                        .hidden{display:none}\
                        .opened{height:' + widgetHeightOpen + 'px;}\
                        .widget-nav{color:#fff;position: relative;top: 10px;text-align:center;display:flex;flex-flow: row wrap;justify-content:space-around;}\
                        .widget-nav a{transition: all 1s ease;position: relative;line-height:20px;text-decoration:none;display: inline-block;text-align: center;text-decoration: none;border-radius: 10em;background: #fff;height: 20px;width: 20px;color:#0e8ad4;}\
                        .hidden-left{left:-100% !important;}\
                        .slider-wrapper {position: relative;overflow: hidden;margin: 20px auto 0 auto;border-radius: 4px;}\
                        .slider-wrapper ul {position: relative;margin: 0;padding: 0;height: 100%;list-style: none;}\
                        .slider-wrapper ul li {position: relative;display: block;float: left;margin: 0;padding: 0;height: 100%;background: #ccc;text-align: center;line-height: 300px;}\
                        .hidden-right{right:-100% !important;}\
                        .arrow-left {left:0%;}\
                        .arrow-right{right:0%;}\
                        .widget-mobile{}\
                        @media (max-width: 480px) {\
                        .widget{border-radius:100em;width:' + widgetRadius + 'px!important;height:' + widgetRadius + 'px!important}\
                        .widget-nav{top:0px;}\
                        .opened{width:100%!important;height:100%!important;border-radius:0px;right:0px;top:0px;}\
                        }\
';

        $('head').append((style));

        //appending


        //triggers
        $('.widget').click(function(e) {
            if ($(e.target).is('.widget') || $(e.target).is('.widget-nav') || $(e.target).is('.widget-title') || $(e.target).is('.widget-mobile')) {
                $('.widget').toggleClass('opened')
                $('.widget-mobile').toggleClass('scale--animate');
                $('.slider-wrapper').toggleClass('hidden');
                $('.arrow-left').toggleClass('hidden-left');
                $('.arrow-right').toggleClass('hidden-right');
            }

        });



        var slideCount = $('.slider-wrapper ul li').length;
        var slideHeight = $('.slider-wrapper ul li').height();
        var sliderUlWidth = slideCount * widgetWidth;

        $('.slider-wrapper').css({ width: widgetWidth, height: '100%' });

        $('.slider-wrapper ul').css({ width: sliderUlWidth, marginLeft: -widgetWidth });

        $('.slider-wrapper li').css({ width: widgetWidth + 'px' });

        $('.slider-wrapper ul li:last-child').prependTo('.slider-wrapper ul');

        function moveLeft() {
            $('.slider-wrapper ul').animate({
                left: +widgetWidth
            }, 200, function() {
                $('.slider-wrapper ul li:last-child').prependTo('.slider-wrapper ul');
                $('.slider-wrapper ul').css('left', '');
            });
        };

        function moveRight() {
            $('.slider-wrapper ul').animate({
                left: -widgetWidth
            }, 200, function() {
                $('.slider-wrapper ul li:first-child').appendTo('.slider-wrapper ul');
                $('.slider-wrapper ul').css('left', '');
            });
        };

        $('a.control_prev').click(function(e) {
            e.preventDefault();
            moveLeft();
        });

        $('a.control_next').click(function(e) {
            e.preventDefault();
            moveRight();
        });
        console.log('done')
    });
}