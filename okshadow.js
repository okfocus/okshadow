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

        base.start = function () {
            $(window).bind({
                mousemove: base.mousemove
            });
            base.mousemove({ pageX: $(window).width() / 2, pageY: $(window).height() / 2 });
            if (base.options.transparent) {
              base.el.style.color = "transparent";
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
            sx = (cx - x) / base.options.xFactor,
            sy = (cy - y) / base.options.yFactor,
            distance = Math.sqrt(dx*dx + dy*dy),
            fuzz = distance / base.options.fuzz + base.options.fuzzMin;
            if (base.options.xMax !== null)
              sx = base.clamp(sx, -1 * base.options.xMax, base.options.xMax)
            if (base.options.yMax !== null)
              sy = base.clamp(sy, -1 * base.options.yMax, base.options.yMax)
            if (base.options.fuzzMax !== null)
              fuzz = base.clamp(fuzz, base.options.fuzzMin, base.options.fuzzMax)
            if (base.options.textShadow) {
                base.$el.css('text-shadow', sx + "px " + sy + "px " + fuzz + "px " + base.options.color);
            } else {
                base.$el.css('box-shadow', sx + "px " + sy + "px " + fuzz + "px " + base.options.color);
            } 
        };

        base.init();
    };
            
    $.okshadow.options = { 
        color: '#888',
        fuzz: 40,
        fuzzMin: 0,
        fuzzMax: null,
        xFactor: 30,
        xMax: null,
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
    
})(jQuery);
