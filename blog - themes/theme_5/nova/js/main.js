jQuery(function($) {
	//Goto Top
	$('.gototop').click(function(event) {
		 event.preventDefault();
		 $('html, body').animate({
			 scrollTop: $("body").offset().top
		 }, 500);
	});	
	//End goto top		

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