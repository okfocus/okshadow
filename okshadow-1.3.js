/*

  OKShadow by OKFocus
  http://okfoc.us // @okfocus
  Copyright 2012 OKFocus
  Version 1.3
  Licensed under the MIT License

*/

(function(c){c.okshadow=function(f,h){var a=this;a.$el=c(f);a.el=f;a.$el.data("okshadow",a);var g=!0;a.init=function(){a.options=c.extend({},c.okshadow.options,h);a.build()};a.build=function(){a.start()};a.clamp=function(a,d,c){return Math.max(d,Math.min(c,a))};a.setoption=function(b,d){if("string"===typeof b){if(a.options[b]=d,"color"===b)return a.update(a.sx,a.sy,a.fuzz)}else a.options=c.extend(a.options,b);a.mousemove(a)};a.start=function(){(-1!==navigator.userAgent.indexOf("Mobile")||-1!==navigator.userAgent.indexOf("Android"))&&
"DeviceOrientationEvent"in window?(window.addEventListener("deviceorientation",a.deviceorientation,!1),a.deviceorientation({alpha:0,beta:0,gamma:0}),window.addEventListener("resize",a.resize,!1),a.portraitMode=!0):(c(window).bind({mousemove:a.mousemove}),a.mousemove({pageX:c(window).width()/2,pageY:c(window).height()/2}));if(a.options.transparent)a.el.style.color="transparent";a.update()};a.resize=function(){var b=c(window).height()/c(window).width();a.portraitMode=1<=b};a.deviceorientation=function(b){if(b&&
"beta"in b&&b.beta){var d;a.portraitMode?(d=b.beta,b=b.gamma):(d=b.gamma,b=b.beta);distance=Math.sqrt(d*d+b*b);a.sx=null!=a.options.xMax?b/90*a.options.xMax:50*(b/90);a.sy=null!=a.options.yMax?d/90*a.options.yMax:50*(d/90);a.fuzz=null!=a.options.fuzzMax?Math.min(Math.abs(distance/90*(a.options.fuzzMax-a.options.fuzzMin)+a.options.fuzzMin),a.options.fuzzMax):Math.abs(distance/90*(30-a.options.fuzzMin)+a.options.fuzzMin,30);if(a.options.downwards)a.sy=Math.abs(a.sy);a.sx+=a.options.xOffset;a.sy+=a.options.yOffset}};
a.mousemove=function(b){var d=a.$el.offset(),c=b.pageX,b=b.pageY,e=d.top+a.$el.height()/2,d=d.left+a.$el.width()/2-c,e=e-b;sx=d/a.options.xFactor;sy=e/a.options.yFactor;distance=Math.sqrt(d*d+e*e);fuzz=distance/a.options.fuzz+a.options.fuzzMin;null!=a.options.xMax&&(sx=a.clamp(sx,-1*a.options.xMax,a.options.xMax));null!=a.options.yMax&&(sy=a.clamp(sy,-1*a.options.yMax,a.options.yMax));null!=a.options.fuzzMax&&(fuzz=a.clamp(fuzz,a.options.fuzzMin,a.options.fuzzMax));sx+=a.options.xOffset;sy+=a.options.yOffset;
a.pageX=c;a.pageY=b;a.sx=sx;a.sy=sy;a.fuzz=fuzz};a.browsers=" -moz- -webkit- -ms-".split(" ");a.update=function(){if(g){requestAnimFrame(a.update);var b=a.sx+"px "+a.sy+"px "+a.fuzz+"px "+a.options.color,d=a.options.textShadow?"text-shadow":"box-shadow",c={},e;for(e in a.browsers)c[a.browsers[e]+d]=b;a.$el.css(c)}};a.pause=function(){g=!1};a.unpause=function(){g||(g=!0,a.update())};a.init()};c.okshadow.options={color:"#888",fuzz:40,fuzzMin:0,fuzzMax:30,xOffset:0,xFactor:30,xMax:30,yOffset:0,yFactor:30,
yMax:30,downwards:!0,textShadow:!1,transparent:!1};c.fn.okshadow=function(f){return this.each(function(){new c.okshadow(this,f)})};window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(c){window.setTimeout(c,1E3/60)}}()})(jQuery);
