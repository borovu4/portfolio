$(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function () {
        $(this).toggleClass('open'),
            $('.control-sidebar').toggleClass('active')
    });
});

$(window).scroll(function () {
    var sticky = $("#navbar-main"),
        scroll = $(window).scrollTop();

    if (scroll >= 50) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
});

$(document).ready(function () {
    $(".select2").select2({
        minimumResultsForSearch: -1,
        dropdownCssClass: "drop-theme"
    });
});

$('.owl-recommend').owlCarousel({
    items: 3,
    loop: true,
    margin: 30,
    stagePadding: 15,
    dots: false,
    nav: true,
    navText: [
        "<i class='material-icons'>arrow_back</i>",
        "<i class='material-icons'>arrow_forward</i>"
    ]
});

$('.main-slider').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false
});


