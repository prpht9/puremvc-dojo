// Sample Custom Matcher
beforeEach(function() {
    dojo.ready(function(){
    });
    //loadFixtures('fixtures/block_slider.html');
    toHaveStyle: function(expected) {
      //var style = dojo.style(this.actual)
      //var val = style[key];
      var style = this.actual;
      return style === expected;
    }
  });
});

afterEach(function() {
});
