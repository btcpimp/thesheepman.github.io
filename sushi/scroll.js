jQuery(document).ready(function($) {
    $("#toBagtroll").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#Bagtroll").offset().top
        }, 1500);
    });
});

jQuery(document).ready(function($) {
    $("#toGunkan").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#Gunkan").offset().top
        }, 2000);
    });
});

jQuery(document).ready(function($) {
    $("#toHosokomaki").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#Hosokomaki").offset().top
        }, 2000);
    });
});

jQuery(document).ready(function($) {
    $("#toKaburiMaki").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#KaburiMaki").offset().top
        }, 2000);
    });
});

jQuery(document).ready(function($) {
    $("#toNigiri").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#Nigiri").offset().top
        }, 2000);
    });
});

jQuery(document).ready(function($) {
    $("#toTempura_roll").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#Tempura_roll").offset().top
        }, 2000);
    });
});

jQuery(document).ready(function($) {
    $("#toUramaki").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#Uramaki").offset().top
        }, 2000);
    });
});

jQuery(document).ready(function($) {
    $("#toFooter").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#footerContent").offset().top
        }, 2000);
    });
});

jQuery(document).ready(function($) {
    $(".button").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(".cart-button").offset().top
        }, 300);
    });
});