$(document).ready(function () {
    var handleMatchMedia = function (mediaQuery) {
            if (mediaQuery.matches) {
                $(".navbar").addClass("navbar-fixed-top");
            } else {
                $(".navbar").removeClass("navbar-fixed-top");
            }
        },
        mql = window.matchMedia('all and (max-width: 991px)');

    handleMatchMedia(mql); //Execute on load
    mql.addListener(handleMatchMedia); //Execute each time media query will be reached
});

$(document).ready(function () {
    $('select').select2({
        minimumResultsForSearch: -1
    });
});