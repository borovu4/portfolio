function stickynav() {
    var window_scroll = jQuery(window).scrollTop();
    jQuery(window).scroll(function (e) {
        if (jQuery(window).scrollTop() > 160) {
            jQuery('body').addClass('scrolled-nav');
        } else {
            jQuery('body').removeClass('scrolled-nav');
        }
    });
}
stickynav();

!function (a, b) {
    "use strict";
    var c, d, e, f = "._tap", g = "._tapActive", h = "tap", i = "clientX clientY screenX screenY pageX pageY".split(" "), j = {
        count: 0,
        event: 0
    }, k = function (a, c) {
        var d = c.originalEvent, e = b.Event(d);
        e.type = a;
        for (var f = 0, g = i.length; g > f; f++)e[i[f]] = c[i[f]];
        return e
    }, l = function (a) {
        if (a.isTrigger)return !1;
        var c = j.event, d = Math.abs(a.pageX - c.pageX), e = Math.abs(a.pageY - c.pageY), f = Math.max(d, e);
        return a.timeStamp - c.timeStamp < b.tap.TIME_DELTA && f < b.tap.POSITION_DELTA && (!c.touches || 1 === j.count) && o.isTracking
    }, m = function (a) {
        if (!e)return !1;
        var c = Math.abs(a.pageX - e.pageX), d = Math.abs(a.pageY - e.pageY), f = Math.max(c, d);
        return Math.abs(a.timeStamp - e.timeStamp) < 750 && f < b.tap.POSITION_DELTA
    }, n = function (a) {
        if (0 === a.type.indexOf("touch")) {
            a.touches = a.originalEvent.changedTouches;
            for (var b = a.touches[0], c = 0, d = i.length; d > c; c++)a[i[c]] = b[i[c]]
        }
        a.timeStamp = Date.now ? Date.now() : +new Date
    }, o = {
        isEnabled: !1, isTracking: !1, enable: function () {
            o.isEnabled || (o.isEnabled = !0, c = b(a.body).on("touchstart" + f, o.onStart).on("mousedown" + f, o.onStart).on("click" + f, o.onClick))
        }, disable: function () {
            o.isEnabled && (o.isEnabled = !1, c.off(f))
        }, onStart: function (a) {
            a.isTrigger || (n(a), (!b.tap.LEFT_BUTTON_ONLY || a.touches || 1 === a.which) && (a.touches && (j.count = a.touches.length), o.isTracking || (a.touches || !m(a)) && (o.isTracking = !0, j.event = a, a.touches ? (e = a, c.on("touchend" + f + g, o.onEnd).on("touchcancel" + f + g, o.onCancel)) : c.on("mouseup" + f + g, o.onEnd))))
        }, onEnd: function (a) {
            var c;
            a.isTrigger || (n(a), l(a) && (c = k(h, a), d = c, b(j.event.target).trigger(c)), o.onCancel(a))
        }, onCancel: function (a) {
            a && "touchcancel" === a.type && a.preventDefault(), o.isTracking = !1, c.off(g)
        }, onClick: function (a) {
            return !a.isTrigger && d && d.isDefaultPrevented() && d.target === a.target && d.pageX === a.pageX && d.pageY === a.pageY && a.timeStamp - d.timeStamp < 750 ? (d = null, !1) : void 0
        }
    };
    b(a).ready(o.enable), b.tap = {POSITION_DELTA: 10, TIME_DELTA: 400, LEFT_BUTTON_ONLY: !0}
}(document, jQuery);
