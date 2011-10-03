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
          return Math.max(min, Math.min(max, x))
        };

        base.start = function () {
            $(window).bind({
                mousemove: function(e){
                    var offset = base.$el.offset(),
                    x = e.pageX,
                    y = e.pageY,
                    cy = offset.top + base.$el.height() / 2,
                    cx = offset.left + base.$el.width() / 2,
                    dx = (cx - x),
                    dy = (cy - y)
                    sx = (cx - x) / base.options.xOffset,
                    sy = (cy - y) / base.options.yOffset,
                    distance = Math.sqrt(dx*dx + dy*dy),
                    fuzz = distance / base.options.fuzz + base.options.fuzzMin;
                    if (base.options.xMax > 0)
                      sx = base.clamp(sx, -1 * base.options.xMax, base.options.xMax)
                    if (base.options.yMax > 0)
                      sy = base.clamp(sy, -1 * base.options.yMax, base.options.yMax)
                    if (base.options.fuzzMax > 0)
                      fuzz = base.clamp(fuzz, base.options.fuzzMin, base.options.fuzzMax)
                    if (base.options.textShadow) {
                        base.$el.css('text-shadow', sx + "px " + sy + "px " + fuzz + "px " + base.options.color);
                    } else {
                        base.$el.css('box-shadow', sx + "px " + sy + "px " + fuzz + "px " + base.options.color);
                    } 
                }
            });
        };
        base.init();
    };
            
    $.okshadow.options = { 
        color: '#888',
        fuzz: 40,
        fuzzMin: 0,
        fuzzMax: 0,
        xOffset: 30,
        xMax: 0,
        yOffset: 30,
        yMax: 0,
        textShadow: false
    };
    
    $.fn.okshadow = function(options){
        return this.each(function(){
            (new $.okshadow(this, options));            
        });
    };
    
})(jQuery);
