//owl-carousel
$('.owl-recall').owlCarousel({
    autoHeight:true,
    loop: true,
    margin: 15,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsive: {
        0: {
            items: 1,
            dots: false
        },
        600: {
            items: 2,
            dots: false
        },
        992: {
            items: 3
        },
        1200: {
            items: 4
        },
        1500: {
            items: 5
        }
    }
});


// select2

function formatState (state) {
    if (!state.id) { return state.text; }
    var $state = $(
        '<span><img src="web/img/' + state.element.value.toLowerCase() + '.png" class="currency" /> ' + state.text + '</span>'
    );
    return $state;
};

$(".select2").select2({
    width: '100%',
    minimumResultsForSearch: -1,
    dropdownCssClass: "select--drop",
    templateResult: formatState,
    templateSelection: formatState
});
