/*
 * OKShadow by OKFocus - http://okfoc.us - @okfocus
 * Version 1.3
 * Licensed under MIT.
 *
 */

(function($){

  $.okshadow = function(el, options){
    var base = this;       
    base.$el = $(el);
    base.el = el;        
    base.$el.data("okshadow", base);
    
    var active = true;

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
      if (detectMobile() && ('DeviceOrientationEvent' in window)) {
        window.addEventListener("deviceorientation", base.deviceorientation, false);
        base.deviceorientation({ 'alpha': 0, 'beta': 0, 'gamma': 0 });
        window.addEventListener("resize", base.resize, false);
        base.portraitMode = true;
      } else {
        $(window).bind({ mousemove: base.mousemove });
        base.mousemove({ pageX: $(window).width() / 2, pageY: $(window).height() / 2 });
      }
      if (base.options.transparent) base.el.style.color = "transparent";
      base.update();
    };
    
    base.resize = function(){
      var aspect = $(window).height() / $(window).width();
      base.portraitMode = aspect >= 1;
    };

    // In portrait mode, "beta" is forward/backward, "gamma" is left-right.
    // In landscape mode, the opposite is true.
    base.deviceorientation = function (e){
      if (e && 'beta' in e) {
        var b, g;
        if (base.portraitMode) {
          b = e.beta;
          g = e.gamma;
        } else {
          b = e.gamma;
          g = e.beta;
        }
        distance = Math.sqrt(b*b + g*g);
        if (base.options.xMax != null) base.sx = g / 90 * base.options.xMax;
        else                           base.sx = g / 90 * 50;
        if (base.options.yMax != null) base.sy = b / 90 * base.options.yMax;
        else                           base.sy = b / 90 * 50;
        if (base.options.fuzzMax != null)
          base.fuzz = Math.min(Math.abs((distance / 90 * (base.options.fuzzMax - base.options.fuzzMin)) + base.options.fuzzMin), base.options.fuzzMax);
        else
          base.fuzz = Math.abs((distance / 90 * (30 - base.options.fuzzMin)) + base.options.fuzzMin, 30);
        if (base.options.downwards)
          base.sy = Math.abs(base.sy);
        base.sx += base.options.xOffset;
        base.sy += base.options.yOffset;
      }
    };

    base.mousemove = function (e){
      var offset = base.$el.offset(),
      x = e.pageX,
      y = e.pageY,
      cy = offset.top + base.$el.height() / 2,
      cx = offset.left + base.$el.width() / 2,
      dx = (cx - x),
      dy = (cy - y),
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
      // base.update(sx, sy, fuzz);
    };
    
    base.browsers = " -moz- -webkit- -ms-".split(" ");
    base.update = function (sx, sy, fuzz) {
      if (! active) return;
      requestAnimFrame(base.update);
      var val = base.sx + "px " + base.sy + "px " + base.fuzz + "px " + base.options.color;
      var prop = base.options.textShadow ? "text-shadow" : "box-shadow";
      var styles = {};
      for (var i in base.browsers) {
        styles[base.browsers[i] + prop] = val;
      }
      base.$el.css(styles);
    };

    base.pause = function(){
      active = false;
    };

    base.unpause = function(){
      if (! active) {
        active = true;
        base.update();
      }
    };

    
    base.init();
  };

  $.okshadow.options = { 
    color: '#888',
    fuzz: 40,
    fuzzMin: 0,
    fuzzMax: 30,
    xOffset: 0,
    xFactor: 30,
    xMax: 30,
    yOffset: 0,
    yFactor: 30,
    yMax: 30,
    downwards: true,
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
