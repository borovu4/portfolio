$(document).ready(function () {
    $("#navbar").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top - 50;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

$(function() {

    function reposition() {

        var modal = $(this),
            dialog = modal.find('.modal-dialog');

        modal.css('display', 'block');

        // Dividing by two centers the modal exactly, but dividing by three
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));

    }

    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);

    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
    });

});
