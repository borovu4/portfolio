// $(document).ready(function(){
//     function resizeForm(){
//         var width = (window.innerWidth > 0) ? window.innerWidth : document.documentElement.clientWidth;
//         if(width > 991){
//             $(".mega-dropdown").hover(
//                 function() {
//                     $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("100");
//                     $(this).toggleClass('open');
//                 },
//                 function() {
//                     $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("50");
//                     $(this).toggleClass('open');
//                 }
//             );
//         } else {
//
//         }
//     }
//     window.onresize = resizeForm;
//     resizeForm();
// });
$('.modal').on('show.bs.modal', function (e) {
    $('body').addClass('modal_fix');
});
$(document).ready(function () {
    $(document).on('show.bs.modal', '.modal', function (event) {
        var zIndex = 1055 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
    $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
    });
});

$('.main-slide').owlCarousel({
    items: 1,
    loop:true,
    nav:true,
    navText:["<i class='icon-left'></i>","<i class='icon-right'></i>"],
    autoplay:true,
    autoplayTimeout:7500,
    autoplayHoverPause:true
});

$('.hits-slide').owlCarousel({
    dots: false,
    margin: 30,
    nav:true,
    navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:true
        },
        900:{
            items:4,
            nav:true,
            loop:false
        },
        1200:{
            items:5,
            nav:true,
            loop:false
        }
    }
});

// form-sale
$('.form-sale').validator();

// menu
$(document).ready(function(){
    $(".mega-dropdown-menu .btn-sm").on("click", function(e){
        $(this).closest(".list-unstyled").toggleClass("open");
        e.stopPropagation();
        e.preventDefault();
    });
});

// offcanvas

$(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });
});