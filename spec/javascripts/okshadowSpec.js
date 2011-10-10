 describe('okshadow', function() {
     var testDiv;
     
     beforeEach(function(){
         
         this.addMatchers({
             toHaveBoxShadow: function() {
                 if (this.actual.css('boxShadow') && this.actual.css('boxShadow') !== 'none') return true;
             },
             toHaveTextShadow: function() {
                 if (this.actual.css('text-shadow') && this.actual.css('textShadow') !== 'none') return true;
             }
         });
     });
     
     describe('with default options', function () {        
         beforeEach(function(){
             jasmine.getFixtures().set('<div id="test"></div>');
             testDiv = $('#test').okshadow();
         });
         
         it('adds box-shadow', function () {
             expect(testDiv).toHaveBoxShadow();
         });

     });
     
     describe('allows developers to control options', function() {
         beforeEach(function(){
             jasmine.getFixtures().set('<div id="test"><p>OKFocus.</p></div>');
         });
         
         it('text shadow', function() {
             testDiv = $('#test p').okshadow({
                 textShadow: true
             });
             expect(testDiv).toHaveTextShadow();
         });         


         it('color', function(){
             testText = $('#test p').okshadow({
                 color: 'rgb(4,2,0)'
             });
             expect(/4, 2, 0/.test(testText.css('box-shadow'))).toBe(true);
         });
         
         it('transparency', function(){
             testText = $('#test p').okshadow({
                 transparent: true
             });

             expect(/0, 0, 0, 0/.test(testText.css('color'))).toBe(true);

         });



     });
     
 });