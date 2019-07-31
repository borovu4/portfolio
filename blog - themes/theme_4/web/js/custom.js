 $(document).ready(function () {
     var mat_toogle = $('#mat_toogle-menu');
     var mat_left = $('#mat_menu_left');
     var mat_content = $('#mat_container');
     var mat_events = $('#mat_events');
     var mat_event_menu = $('#mat_event_menu');
     var mat_event_content = $('#mat_event_content');
     var mat_event_details = $('#mat_event_details');
     mat_toogle.click(function () {
         $(this).toggleClass('mat_toogle-menu-close');
         mat_left.toggleClass('col-md-3 col-sm-12');
         mat_left.toggleClass('col-sm-0');
         mat_content.toggleClass('mat_container_border_left');
         mat_events.toggleClass('col-sm-12 col-md-9');
         mat_events.toggleClass('col-sm-12 col-md-12 mat_events_margin_left');
         mat_event_menu.toggleClass('col-md-3 col-sm-12');
         mat_event_menu.toggleClass('col-sm-0');
         mat_event_content.toggleClass('col-md-9');
         mat_event_content.toggleClass('col-md-12');
         mat_event_details.toggleClass('mat_container_border_right');
     });
 });