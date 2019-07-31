(function ($) {
    $('.navbar-toggle').each(function () {
        $(this).click(function () {
            $(this).toggleClass('open');
        });
    });
})(jQuery);

$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

$('.main-owl').owlCarousel({
    loop: true,
    items: 1
});

$('.cert-owl').owlCarousel({
    items: 1,
    mouseDrag: false,
    touchDrag: false
});

$('.owl-recommended').owlCarousel({
    loop: true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        992:{
            items:3
        }
    }
});


$('.owl-presents').owlCarousel({
    loop: true,
    dotsData:true,
    items: 1
});

$(function () {
    $(".slider-range").slider({
        range: true,
        min: 0,
        max: 500,
        values: [0, 500],
        slide: function (event, ui) {
            for (var i = 0; i < ui.values.length; ++i) {
                $("input.sliderValue[data-index=" + i + "]").val(ui.values[i] + " грн");
            }
        }
    });
    $("input.sliderValue").change(function () {
        var $this = $(this);
        $(".slider-range").slider("values", $this.data("index"), $this.val());
    });
});
$(document).ready(function () {
    $(".select2").select2({
        minimumResultsForSearch: -1,
        dropdownCssClass: "drop-theme"
    });
});

$(document).ready(function () {
    $("#to-search").click(function () {
        $(".form-search").toggleClass("open");
    });
});

$('.lightgallery').lightGallery();


$('.rating-result').rating({displayOnly: true, step: 0.5});

