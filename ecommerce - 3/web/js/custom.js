//Animate block

//$(document).ready(function () {
//
//    $(".jumbotron-1").addClass('animated zoomIn');
//
//    var h = $(window).height();
//    $(window).scroll(function () {
//        if (($(this).scrollTop() + h) >= $(".jumbotron-2").offset().top) {
//            $(".jumbotron-2").css({visibility: "visible"});
//            $(".jumbotron-2").eq(0).addClass('animated bounceInLeft');
//            $(".jumbotron-2").eq(1).addClass('animated bounceInRight');
//        }
//        if (($(this).scrollTop() + h) >= $(".jumbotron-3").offset().top) {
//            $(".jumbotron-3").css({visibility: "visible"});
//            $(".jumbotron-3").eq(0).addClass('animated pulse');
//            $(".jumbotron-3").eq(1).addClass('animated pulse');
//        }
//    });
//});

(function ($) {

    //Function to animate slider captions
    function doAnimations(elems) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';

        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }

    //Variables on page load
    var $myCarousel = $('.fade-carousel'),
        $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

    //Initialize carousel
    $myCarousel.carousel();

    //Animate captions in first slide on page load
    doAnimations($firstAnimatingElems);

    //Pause carousel
    $myCarousel.carousel('pause');


    //Other slides to be animated on carousel slide event
    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });

})(jQuery);

function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function animationClick(element, animation) {
    element = $(element);
    element.click(
        function () {
            element.addClass('animated ' + animation);
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);

        });
}

//totop
$(document).ready(function () {
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    //Click event to scroll to top
    $('.scrollToTop').click(function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

});

//select2


$(window).resize(function() {
    $(document).ready(function () {
        $('select').select2({
            minimumResultsForSearch: -1
        });
    });
});



//owl slide
$(document).ready(function () {

    //Sort random function
    function random(owlSelector) {
        owlSelector.children().sort(function () {
            return Math.round(Math.random()) - 0.5;
        }).each(function () {
            $(this).appendTo(owlSelector);
        });
    }

    $("#owl-demo").owlCarousel({

        items: 3,
        itemsDesktop: [1000, 2],
        itemsDesktopSmall: [900, 2],
        itemsTablet: [600, 2],
        itemsMobile: [479, 1],
        pagination: true,
        navigation: true,
        navigationText: [
            "<i class='glyphicon glyphicon-menu-left'></i>",
            "<i class='glyphicon glyphicon-menu-right'></i>"
        ],
    });

});


//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/
$(document).ready(function () {
    $('.btn-number').click(function (e) {
        e.preventDefault();

        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        var input = $("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }


    });
    $(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});

//popover
$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});


//efect dropdown menu navbar-menu-link
$(document).ready(function () {
    var handleMatchMedia = function (mediaQuery) {
            if (mediaQuery.matches) {
                $(".navbar-menu-link").attr("data-toggle", "dropdown");
                $(".dropdown-menu.animated.fadeIn").removeClass('animated');
                $(".footer-block .footer-block-head").attr("data-toggle", "dropdown");

                $(".footer-block .dropdown").removeClass('open');

            } else {
                $(".navbar-menu-link").removeAttr("data-toggle", "dropdown");
                $(".dropdown-menu.animated.fadeIn").addClass('animated');
                $(".footer-block .footer-block-head").removeAttr("data-toggle", "dropdown");

                $('.navbar-menu .dropdown-menu').hover(function () {
                        $(this).parent('.dropdown').addClass('open');
                    },
                    function () {
                        $(this).parent('.dropdown').removeClass('open');
                    });
                $(".footer-block .dropdown").addClass('open');
            }
        },
        mql = window.matchMedia('all and (max-width: 767px)');

    handleMatchMedia(mql); //Execute on load
    mql.addListener(handleMatchMedia); //Execute each time media query will be reached
});


$(document).ready(function () {
    var handleMatchMedia = function (mediaQuery) {
            if (mediaQuery.matches) {
                $(".panel-theme-drop").removeClass('in');
                $(".panel-theme-head").addClass('collapsed');
            } else {
                $(".panel-theme-drop").addClass('in');
                $(".panel-theme-head").removeClass('collapsed');
            }
        },
        mql = window.matchMedia('all and (max-width: 991px)');

    handleMatchMedia(mql); //Execute on load
    mql.addListener(handleMatchMedia); //Execute each time media query will be reached
});

//owl card-page


$(document).ready(function () {

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    sync1.owlCarousel({
        singleItem: true,
        slideSpeed: 1000,
        navigation: false,
        pagination: false,
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
    });

    sync2.owlCarousel({
        items: 4,
        itemsDesktop: 	[1199,4],
        itemsDesktopSmall:	[979,3],
        itemsTablet: [767,2],
        itemsMobile: 0,
        navigation: true,
        navigationText: [
            "<i class='glyphicon glyphicon-menu-left'></i>",
            "<i class='glyphicon glyphicon-menu-right'></i>"
        ],
        pagination: false,
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if ($("#sync2").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    $("#sync2").on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo", number);
    });

    function center(number) {
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in sync2visible) {
            if (num === sync2visible[i]) {
                var found = true;
            }
        }

        if (found === false) {
            if (num > sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", num - sync2visible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if (num === sync2visible[sync2visible.length - 1]) {
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if (num === sync2visible[0]) {
            sync2.trigger("owl.goTo", num - 1)
        }

    }

});

$(document.body)
    .on('show.bs.modal', function () {
        if (this.clientHeight <= window.innerHeight) {
            return;
        }
        // Get scrollbar width
        var scrollbarWidth = getScrollBarWidth()
        if (scrollbarWidth) {
            $(document.body).css('padding-right', scrollbarWidth);
            $('.navbar-fixed-top').css('padding-right', scrollbarWidth);
        }
    })
    .on('hidden.bs.modal', function () {
        $(document.body).css('padding-right', 0);
        $('.navbar-fixed-top').css('padding-right', 0);
    });

function getScrollBarWidth () {
    var fwidth = $(document).width();
    $('html').css('overflow-y', 'hidden');
    var swidth = $(document).width();
    $("html").css("overflow-y", "visible");
    return (swidth - fwidth);
};