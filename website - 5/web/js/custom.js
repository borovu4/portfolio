$(function () {
    $('[data-toggle="popover"]').popover()
});

//owlCarousel
$('.main_carousel').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true
});

$('.top-carousel').owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: true,
    navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
    ],
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        1000: {
            items: 4
        }
    }
});

$('.owl-card').owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: true,
    navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
});

$('.slide-recall').owlCarousel({
    items: 1,
    autoHeight: true,
    loop: true,
    dots: false,
    nav: true,
    navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>"
    ]
});

$(document).ready(function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
        $('.foto-carousel').owlCarousel({
            center:true,
            items: 1,
            loop: true,
            margin: 5,
            dots: false,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            stagePadding: 40
        });
    } else if (window.matchMedia('(max-width: 992px)').matches) {
        $('.foto-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            dots: false,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            stagePadding: 120
        });
    } else if (window.matchMedia('(max-width: 1199px)').matches) {
        $('.foto-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            dots: false,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            stagePadding: 92
        });
    } else {
        $('.foto-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            dots: false,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            stagePadding: 120
        });
    }

});

//select2

$("#select1").select2({
    width: '100%',
    minimumResultsForSearch: -1,
    dropdownCssClass: "select--drop",
    placeholder: "Сфера бизнеса ..."
});
$("#select2").select2({
    width: '100%',
    minimumResultsForSearch: -1,
    dropdownCssClass: "select--drop",
    placeholder: "Выберите категорию"
});
$("#select3").select2({
    width: '100%',
    minimumResultsForSearch: -1,
    dropdownCssClass: "select--drop",
    placeholder: "Размер инвестиций"
});
$(".quantity").select2({
    minimumResultsForSearch: -1,
    dropdownCssClass: "select--drop_2"
});
$(".filter_select").select2({
    width: '100%',
    minimumResultsForSearch: -1,
    dropdownCssClass: "select--drop"
});


//validator
$('#form-feedback').validator();

//dropdown-mega-menu
$(document).ready(function () {
    if (window.matchMedia('(max-width: 767px)').matches) {

    } else {
        $(".custom_nav .dropdown-mega").hover(
            function () {
                $('.dropdown-mega-menu', this).not('.in .dropdown-mega-menu').stop(true, true);
                $(this).toggleClass('open');
            },
            function () {
                $('.dropdown-mega-menu', this).not('.in .dropdown-mega-menu').stop(true, true);
                $(this).toggleClass('open');
            }
        );
    }
});

$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).parent().siblings().removeClass('open');
    $(this).parent().toggleClass('open');
});


//navbar
$(document).ready(function () {
    $(".navbar").affix({offset: {top: $(".navbar").outerHeight(true)}});
});

//company_scroll
$(document).ready(function () {
    if (window.matchMedia('(max-width: 768px)').matches) {
        $("#company_scroll").affix({offset: {top: $("#company_scroll").outerHeight(true) + 163}});
    } else {
        $("#company_scroll").affix({offset: {top: $("#company_scroll").outerHeight(true) + 51}});
    }
});

//nav-tabs

$('.nav-tabs li a').click(function (e) {
    //get selected href
    var href = $(this).attr('href');

    //set all nav tabs to inactive
    $('.nav-tabs li').removeClass('active');

    //get all nav tabs matching the href and set to active
    $('.nav-tabs li a[href="' + href + '"]').closest('li').addClass('active');

    //active tab
    $('.tab-pane').removeClass('active');
    $('.tab-pane' + href).addClass('active');
});


//sidebar
$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});
$(document).mouseup(function (e) {
    var main = $(".search_mob");
    var container = $("#search-form");
    if (window.matchMedia('(max-width: 768px)').matches) {
        $(main).click(function () {
            $(container).toggleClass("open");
        });
    } else {
        $(main).click(function () {
            $(this).addClass("hidden");
            $(container).toggleClass("open");
        });
    }


    if (container.has(e.target).length === 0) {
        container.removeClass("open");
        main.removeClass("hidden");
    }
});

$('#myTab').tabCollapse({
    tabsClass: 'hidden-xs',
    accordionClass: 'visible-xs'
});