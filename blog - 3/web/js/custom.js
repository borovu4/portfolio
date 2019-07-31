$(document).ready(function() {
    var navbarToggle = '.navbar-toggle';
    $('.dropdown, .dropup').each(function() {
        var dropdown = $(this),
            dropdownToggle = $('[data-toggle="dropdown"]', dropdown),
            dropdownHoverAll = dropdownToggle.data('dropdown-hover-all') || false;

        // Mouseover
        dropdown.hover(function(){
            var notMobileMenu = $(navbarToggle).size() > 0 && $(navbarToggle).css('display') === 'none';
            if ((dropdownHoverAll == true || (dropdownHoverAll == false && notMobileMenu))) {
                dropdownToggle.trigger('click');
            }
        })
    });
});