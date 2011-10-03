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
                    fuzz = distance / base.options.fuzz;
                    if (base.$el.css('text-shadow') === 'none' ) {
                        base.$el.css('box-shadow', sx + "px " + sy + "px " + fuzz + "px " + base.options.color);
                    } else {
                        base.$el.css('text-shadow', sx + "px " + sy + "px " + fuzz + "px " + base.options.color);
                    } 
                }
            });
        };
        base.init();
    };
            
    $.okshadow.options = { 
        color: '#888',
        fuzz: 40,
        xOffset: 30,
        yOffset: 30
    };
    
    $.fn.okshadow = function(options){
        return this.each(function(){
            (new $.okshadow(this, options));            
        });
    };
    
})(jQuery);