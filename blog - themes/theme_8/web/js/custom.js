jQuery(document).ready(function () {
    if (jQuery(document).scrollTop() > 35) {
        jQuery('#navigation').addClass('pos_fixed_nav');
    }
    jQuery(window).scroll(function (e) {
        if (jQuery(document).scrollTop() > 35) {
            jQuery('#navigation').addClass('pos_fixed_nav');
        } else {
            jQuery('#navigation').removeClass('pos_fixed_nav');
        }
    });
});

/* Main JS  */
jQuery(document).ready(function ($) {
    jQuery(window).scroll(function (e) {
        if (jQuery(document).scrollTop() > jQuery(window).height()) {
            jQuery('a#gototop').removeClass('notshow');
        } else {
            jQuery('a#gototop').addClass('notshow');
        }
    });
});

jQuery('a#gototop').click(function () {
    jQuery('html, body').animate({
        scrollTop: jQuery('[name="' + jQuery.attr(this, 'href').substr(1) + '"]').offset().top
    }, 680);
    return false;
});
jQuery('#nav-top #search input#s').focus(function (e) {
    jQuery(this).closest('.span6').addClass('search-focus');
});
jQuery('#nav-top #search input#s').focusout(function (e) {
    jQuery(this).closest('.span6').removeClass('search-focus');
});

$(document).ready(function () {
    $('.modal')
        .on('show.bs.modal', function () {
            $(document.body).addClass('modal-open');
        })
        .on('hidden.bs.modal', function () {
            $(document.body).removeClass('modal-open');
        });
});