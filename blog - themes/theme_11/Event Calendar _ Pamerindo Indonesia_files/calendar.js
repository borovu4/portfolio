jQuery('.eventon_fullcal > .evoFC_tip').remove();
jQuery('.evoFC #evcal_list').remove();
var current_event_data = [''];
var current_event_tooltip_text;
jQuery('.eventon_fullcal').on('mouseenter','.has_events',function(event){
    event.preventDefault();
    var event_data = JSON.parse(jQuery(this).attr('data-ed'));
    jQuery(this).qtip({
        show: {
            solo:true,
            ready:true,
            event:false
        },
        hide: {
            event:'unfocus'
        },
        position: {
            my:'bottom center',
            at:'top center'
        },
        content: {
            text: function(event,api) {
                if (event_data.et[0] != current_event_data[0]) {
                    current_event_data = event_data.et;
                    jQuery.ajax({
                    url:ajaxurl,
                    method:'POST',
                    data:{
                        'action':'calendar_widget_tooltip',
                        'event_data':current_event_data
                    },
                    success:function(data) {
                        current_event_tooltip_text = data;
                        api.set('content.text',data);
                    },
                    dataType:'html'
                });
                return '<div class="loading">Loading...</div><div class="event-links"></div>';
                } else {
                    return current_event_tooltip_text;
                }
            },
            button:true
        },
        style: 'qtip-light'
    });
});