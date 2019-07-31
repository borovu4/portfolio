$(document).ready(function () {
    $(".navbar-toggle").click(function () {
        $(this).toggleClass("collapsed");
    });
});
$(document).ready(function () {
    $(".f_search").focus(function () {
        $(this).parent(".stylish-input-group").addClass("active");

    }).blur(function () {
        $(this).parent(".stylish-input-group").removeClass("active");
    })

});

//rate_js
$('.rate-circle').rateCircle({
    size: 40, // Sets the size of the circle
    lineWidth: 2, // Sets the width of circle line
    fontSize: 11, // Font size of rate
    referenceValue: 100 // Used to calculate color and percentage
});


//textarea comment
$(".textarea_style").focus(function () {
    $(this).parent().addClass('active');
});
$(".textarea_style").blur(function () {
    var val = $(this).val();
    if (val.length) {
        $(this).parent().addClass('active');
    } else {
        $(this).parent().removeClass('active');
    }
});

$(".input_fa").focus(function () {
    $(this).parent().addClass('active');
});
$(".input_fa").blur(function () {
    var val = $(this).val();
    if (val.length) {
        $(this).parent().addClass('active');
    } else {
        $(this).parent().removeClass('active');
    }
});

$('.calendar-main').datepicker({
    maxViewMode: 0,
    language: "ru",
    todayHighlight: true

});

$('.modal').on('show.bs.modal', function (e) {
    $('body').addClass('test');
});

$(document).on('show.bs.modal', '.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});
$(document).on('hidden.bs.modal', '.modal', function () {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
});


//scroll comment block

//(function () {
//    var a = document.querySelector('#aside1'), b = null, P = 0;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
//    window.addEventListener('scroll', Ascroll, false);
//    document.body.addEventListener('scroll', Ascroll, false);
//    function Ascroll() {
//        if (b == null) {
//            var Sa = getComputedStyle(a, ''), s = '';
//            for (var i = 0; i < Sa.length; i++) {
//                if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
//                    s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; '
//                }
//            }
//            b = document.createElement('div');
//            b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
//            a.insertBefore(b, a.firstChild);
//            var l = a.childNodes.length;
//            for (var i = 1; i < l; i++) {
//                b.appendChild(a.childNodes[1]);
//            }
//            a.style.height = b.getBoundingClientRect().height + 'px';
//            a.style.padding = '0';
//            a.style.border = '0';
//        }
//        var Ra = a.getBoundingClientRect(),
//            R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.news-regions').getBoundingClientRect().top + 70);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
//        if ((Ra.top - P) <= 0) {
//            if ((Ra.top - P) <= R) {
//                b.className = 'stop';
//                b.style.top = -R + 'px';
//            } else {
//                b.className = 'sticky';
//                b.style.top = P + 'px';
//            }
//        } else {
//            b.className = '';
//            b.style.top = '';
//        }
//        window.addEventListener('resize', function () {
//            a.children[0].style.width = getComputedStyle(a, '').width
//        }, false);
//    }
//})()


//select2
//$('.select2').select2({
//        minimumResultsForSearch: -1
//    })
//    .on("select2:open", function () {
//        $('.select2-results__options').perfectScrollbar();
//    });


//$("select").select2({
//minimumResultsForSearch: -1
//containerCssClass: "select_party"
//dropdownCssClass: "select_party"
//})
//.on("select2:open", function () {
//    $('.select2-results__options').perfectScrollbar();
//});

//$("#filter_partyId").select2({
//    minimumResultsForSearch: -1,
//    dropdownCssClass: "select_party"
//});

$(".progress_3 .progress-bar").animate({
    width: "70%"
}, 1500);


//$('#comment-list').perfectScrollbar();

//(function($) {
//    $(function() {
//        $('.input_number').styler();
//    });
//})(jQuery);

