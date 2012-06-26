/*
 * OKShadow by OKFocus - http://okfoc.us - @okfocus
 * Version 1.2
 * Licensed under MIT.
 *
 */

(function($){

  $.okshadow = function(el, options){
    var base = this;       
    base.$el = $(el);
    base.el = el;        
    base.$el.data("okshadow", base);
    
    base.init = function(){            
      base.options = $.extend({}, $.okshadow.options, options);
      base.build();
    };
    
    base.build = function(){
      base.start();
    };
    
    base.clamp = function (x, min, max) {
      return Math.max(min, Math.min(max, x));
    };

    base.setoption = function (key, value) {
      if (typeof key === "string") {
        base.options[key] = value;
        if (key === 'color')
          return base.update(base.sx, base.sy, base.fuzz);
      } else {
        base.options = $.extend(base.options, key);
      }
      base.mousemove(base);
    };

    base.start = function (){
      if (detectMobile() && DeviceOrientationEvent in window) {
        $(window).bind({ deviceorientation: base.deviceorientation });
        base.deviceorientation({ 'alpha': 0, 'beta': 0, 'gamma': 0 });
      } else {
        $(window).bind({ mousemove: base.mousemove });
        base.mousemove({ pageX: $(window).width() / 2, pageY: $(window).height() / 2 });
      }
      if (base.options.transparent) base.el.style.color = "transparent";
    };

    // "beta" is forward/backward -- 90 degrees is straight up and down
    // "gamma" is left-right
    base.deviceorientation = function (e){
      if (e && 'beta' in e && e.beta) {
        b = ((e.beta + 90 + 360) % 360 - 180);
        g = ((e.gamma + 90 + 360) % 360 - 180);
        if (b < 0) b = -b;
        if (g < 0) g = -g;
        b -= 90;
        g -= 90;
        b /= 90;
        g /= 90;
        if (base.options.xMax != null) sx = b * base.options.xMax;
        else                   sx = b * 50;
        if (base.options.yMax != null) sy = g * base.options.yMax;
        else                   sy = g * 50;
        base.fuzz = (b * (base.options.fuzzMax - base.options.fuzzMin)) + base.options.fuzzMin;
        base.sx += base.options.xOffset;
        base.sy += base.options.yOffset;
        base.update(base.sx, base.sy, base.fuzz);
      }
    };

    base.mousemove = function (e){
      var offset = base.$el.offset(),
      x = e.pageX,
      y = e.pageY,
      cy = offset.top + base.$el.height() / 2,
      cx = offset.left + base.$el.width() / 2,
      dx = (cx - x),
      dy = (cy - y)
      sx = dx / base.options.xFactor,
      sy = dy / base.options.yFactor,
      distance = Math.sqrt(dx*dx + dy*dy),
      fuzz = distance / base.options.fuzz + base.options.fuzzMin;
      
      if (base.options.xMax != null) sx = base.clamp(sx, -1 * base.options.xMax, base.options.xMax);
      if (base.options.yMax != null) sy = base.clamp(sy, -1 * base.options.yMax, base.options.yMax);
      if (base.options.fuzzMax != null) fuzz = base.clamp(fuzz, base.options.fuzzMin, base.options.fuzzMax)
      
      sx += base.options.xOffset;
      sy += base.options.yOffset;
      base.pageX = x;
      base.pageY = y;
      base.sx = sx;
      base.sy = sy;
      base.fuzz = fuzz;
      base.update(sx, sy, fuzz);
    };
    
    base.browsers = " -moz- -webkit- -ms-".split(" ");
    base.update = function (sx, sy, fuzz) {
      var val = sx + "px " + sy + "px " + fuzz + "px " + base.options.color;
      var prop = base.options.textShadow ? "text-shadow" : "box-shadow";
      var styles = {};
      for (var i in base.browsers) {
        styles[base.browsers[i] + prop] = val;
      }
      base.$el.css(styles);
    }
    
    base.init();
  };

  $.okshadow.options = { 
    color: '#888',
    fuzz: 40,
    fuzzMin: 0,
    fuzzMax: null,
    xOffset: 0,
    xFactor: 30,
    xMax: null,
    yOffset: 0,
    yFactor: 30,
    yMax: null,
    textShadow: false,
    transparent: false
  };
  
  $.fn.okshadow = function(options){
    return this.each(function(){
      (new $.okshadow(this, options));            
    });
  };
  
  window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || 
           window.webkitRequestAnimationFrame || 
           window.mozRequestAnimationFrame    || 
           window.oRequestAnimationFrame      || 
           window.msRequestAnimationFrame     || 
           function( callback ){
             window.setTimeout(callback, 1000 / 60);
           };
  })();

  function detectMobile () {
    return navigator.userAgent.indexOf("Mobile") !== -1 || navigator.userAgent.indexOf("Android") !== -1;
  }
})(jQuery);
