'use strict';
var theme = function ($) {

    // prevent empty links
    // ---------------------------------------------------------------------------------------
    function handlePreventEmptyLinks() {
        $('a[href="#"]').click(function (event) {
            event.preventDefault();
        });
    }

    // BootstrapSelect
    // ---------------------------------------------------------------------------------------
    function handleBootstrapSelect() {
        $('.selectpicker').selectpicker();
    }

    // add hover class for correct view on mobile devices
    // ---------------------------------------------------------------------------------------
    function handleHoverClass() {
        var hover = $('.thumbnail');
        hover.hover(
            function () {
                $(this).addClass('hover');
            },
            function () {
                $(this).removeClass('hover');
            }
        );
    }

    // superfish menu
    // ---------------------------------------------------------------------------------------
    function handleSuperFish() {
        $('ul.sf-menu').superfish();
        $('ul.sf-menu a').click(function () {
            $('body').scrollspy('refresh');
        });
        // fixed menu toggle
        $('.menu-toggle').on('click', function () {
            if ($('.navigation').hasClass('opened')) {
                $(this).find('.fa').removeClass('fa-times').addClass('fa-bars');
                $('.navigation').removeClass('opened').addClass('closed');
            } else {
                $(this).find('.fa').removeClass('fa-bars').addClass('fa-times');
                $('.navigation').removeClass('closed').addClass('opened');
            }
        });
        // submenu fix
        $('.mobile-submenu').click(function () {
            $(this).parent().toggleClass('mobile-submenu-open');
        });
        $('ul.sf-menu a').click(function () {
            $('ul.sf-menu li').removeClass('mobile-submenu-open');
        });
    }
// Images carousel
     function initImageCarousel() {
        $('.img-carousel').each(function () {

            var autoplay = $(this).data('autoplay');
            var duration = $(this).data('duration');
            var loop = $(this).data('loop');
            var navigation = $(this).data('navigation');

            $(this).owlCarousel({
                autoplay: autoplay,
                loop: loop,
                autoplayTimeout: duration,
                margin: 0,
                dots: true,
                nav: navigation,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsive: {
                    0: {items: 1},
                    479: {items: 1},
                    768: {items: 1},
                    991: {items: 1},
                    1024: {items: 1}
                }
            });
        });
    }
    // Smooth scrolling
    // ---------------------------------------------------------------------------------------
    function handleSmoothScroll() {
        $('.sf-menu a, .scroll-to').click(function () {

            if ($(this).hasClass('btn-search-toggle')) {
                $('.header-search-wrapper').fadeToggle();
                $('.header').toggleClass('header-overlay');
            }
            else {

                var headerH = $('header').outerHeight();
                var headerH = 0;
                $('.sf-menu a').removeClass('active');
                $(this).addClass('active');
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top - headerH + 'px'
                }, {
                    duration: 1200,
                    easing: 'easeInOutExpo'
                });
                return false;

            }
        });
    }


    // Isotope
    $(window).load(function () {

        if ($().isotope) {
            var tab_active = $('#filtrable-events').data('tab_active');
            if (tab_active != '') {
                $('.isotope.events').isotope({// initialize isotope
                    filter: '.' + tab_active,
                    itemSelector: '.isotope-item' // options...
                    //,transitionDuration: 0 // disable transition
                });
            } else {
                $('.isotope.events').isotope({// initialize isotope
                    itemSelector: '.isotope-item' // options...
                    //,transitionDuration: 0 // disable transition
                });
            }

            $('#filtrable-events a').click(function () { // filter items when filter link is clicked
                var selector = $(this).attr('data-filter');
                $('#filtrable-events a').parent().removeClass('current');
                $(this).parent().addClass('current');
                $('.isotope.events').isotope({filter: selector});
                $('.isotope').isotope('reLayout', $.waypoints('refresh')); // layout/reLayout
                return false;
            });
        }
        if ($().isotope) {
            $('.isotope.gallery').isotope({// initialize isotope
                itemSelector: '.isotope-item' // options...
                //,transitionDuration: 0 // disable transition
            });
            $('#filtrable-gallery a').click(function () { // filter items when filter link is clicked
                var selector = $(this).attr('data-filter');
                $('#filtrable-gallery a').parent().removeClass('current');
                $(this).parent().addClass('current');
                $('.isotope.gallery').isotope({filter: selector});
                $('.isotope').isotope('reLayout', $.waypoints('refresh')); // layout/reLayout
                return false;
            });
        }
    });

    $(window).resize(function () {
        // Refresh isotope
        if ($().isotope) {
            $('.isotope').isotope('reLayout', $.waypoints('refresh')); // layout/relayout on window resize
        }
    });

    // Shrink header on scroll
    // ---------------------------------------------------------------------------------------
    function handleAnimatedHeader() {
        var header = $('.header.fixed');

        function refresh() {
            var scroll = $(window).scrollTop();
            if (scroll >= 99) {
                header.addClass('shrink');
            } else {
                header.removeClass('shrink');
            }
        }
        $(window).load(function () {
            refresh();
        });
        $(window).scroll(function () {
            refresh();
        });
        $(window).on('touchstart', function () {
            refresh();
        });
        $(window).on('scrollstart', function () {
            refresh();
        });
        $(window).on('scrollstop', function () {
            refresh();
        });
        $(window).on('touchmove', function () {
            refresh();
        });

    }

    // INIT FUNCTIONS
    // ---------------------------------------------------------------------------------------
    return {
        init: function () {
            handlePreventEmptyLinks();
            handleBootstrapSelect();
            handleHoverClass();
            handleSuperFish();
            handleSmoothScroll();
            handleAnimatedHeader();
            initImageCarousel();
        },

        // Animation on Scroll
        initAnimation: function () {
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile == false) {
                $('*[data-animation]').addClass('animated');
                $('.animated').waypoint(function (down) {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + ' visible');
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + ' visible');
                        }
                    }
                });
            }
            // Refresh Waypoints on tab click / animation
            $('#tabs-lv1 li a[data-toggle="tab"]').on('shown.bs.tab', function () {
                $.waypoints('refresh');
            });
            $('#tabs-lv2 li a[data-toggle="tab"]').on('shown.bs.tab', function () {
                $.waypoints('refresh');
            });
        }
    };


}(jQuery);



