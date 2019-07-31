"use strict";
jQuery(document).ready(function () {
    theme.init();
});
jQuery(window).load(function () {
    theme.initAnimation();
});

jQuery(window).load(function () {
    jQuery('body').scrollspy({offset: 100, target: '.navigation'});
});
jQuery(window).load(function () {
    jQuery('body').scrollspy('refresh');
});
jQuery(window).resize(function () {
    jQuery('body').scrollspy('refresh');
});

jQuery(window).load(function () {
    if (location.hash != '') {
        var hash = '#' + window.location.hash.substr(1);
        if (hash.length) {
            jQuery('html,body').delay(0).animate({
                scrollTop: jQuery(hash).offset().top - 44 + 'px'
            }, {
                duration: 1200,
                easing: "easeInOutExpo"
            });
        }
    }
});



