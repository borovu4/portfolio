
    if (window.matchMedia('(min-width: 992px)').matches) {
        function materialMenuOnHover(el) {
            $(el).each(function () {
                var $el = $(this);
                var $menu = $('[for="' + $el.attr('id') + '"]');

                var isMenuHovered;

                $el.hover(function () {
                    $el.click();
                }, function () {
                    setTimeout(function () {
                        if (isMenuHovered) {
                            return;
                        }
                        $menu[0].MaterialMenu.hide();
                    }, 10);
                });

                $menu.hover(function () {
                    isMenuHovered = true;
                }, function () {
                    isMenuHovered = false;
                    $menu[0].MaterialMenu.hide();
                });
            });
        }
    }
